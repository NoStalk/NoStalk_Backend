import { Response } from "express";
import jwt from "jsonwebtoken";

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