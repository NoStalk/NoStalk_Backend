import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

const handleRefresh = async (req: Request, res: Response) => {
  if (!req.cookies) {
    return res.status(401).send("No cookies recieved");
  }
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).send("No refresh token");
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
    //console.log(decodedUser);
    return res.status(200).send({
      email: decodedUser.email,
      firstName: decodedUser.firstName,
      lastName: decodedUser.lastName,
    });
  } catch (err) {
    console.error(err);
    return res.status(403).send("Token tampered");
  }
};

export default handleRefresh;
