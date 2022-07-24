import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

/**
   * @param user instance of userModel with the email to signed
   * @param res response object to send the token
   * Creating a jwt token signed with secret key store as environment variable(REFRESH_TOKEN_SECRET)
   * The .sign() method takes a payload and a secret as parameters.
   * The .sign() method returns a Promise.
   * We store the refresh token in the database
   * We send the signed token to the client as an HTTP-only cookie.
   */

export async function sendUserDetailsWithCookie(user: any, res: Response) {

    if (!process.env.REFRESH_TOKEN_SECRET) {
        const err = new Error("REFRESH_TOKEN_SECRET is not defined");
        console.error(err);
        return res.status(500).send(err.message);
    }

    //TODO send platform handles
    const userPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    };


    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });


    try {
        user.refreshToken = refreshToken;
        await user.save();
        console.log("saving refresh token to user");
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            //Secure true only in production. Chorme resquires secure to be true when cookies are httpOnly.
            secure: (process.env.NODE_ENV === 'production'),
            //Max Age set 30 days in production(30 minutes otherwise).
            maxAge: (process.env.NODE_ENV === 'production') ? 1000 * 60 * 30 : 1000 * 60 * 60 * 24 * 30,
        });
        res.status(200).send(userPayload);
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .send("Error saving refresh token to database or error in setting cookie");
    }

}

/**
 * Expresss middleware to verify the refresh token
 * Attach the found user to the request object
 * Else send an error with appropriate error message and status code
 */

export async function verifyAndSetUser(req: Request, res: Response, next: NextFunction) {
    /**
   * Validating the existence of cookies
   * Validating the existence of the refresh token
   */
    if (!req.cookies) {
        return res.status(401).send("No cookies recieved");
    }
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return 
        res.status(401).send("No refresh token");
    }
    /**
     * finding the token in the database
     * Checking if the token is issued by the server
     * The .verify() method takes a token and a secret as parameters.
     * The .verify() method returns a Promise.
     * Then we verify the validity of the token by cross-checking the email.
     * If everything is fine, then we return the user information to the client.
     */
    const foundUser = await userModel.findOne({ refreshToken }).exec();

    if (!foundUser) {
        return res.status(403).send("Invalid refresh token");
    }
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return res.status(500).send("REFRESH_TOKEN_SECRET is not defined");
    }
    try {
        let decodedUser: any = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        if (decodedUser.email !== foundUser.email) {
            return res.status(403).send("Invalid refresh token");
        }


    } catch (err) {
        console.error(err);
        return res.status(403).send("Token tampered");
    }

    req.user = foundUser;

    next();

}