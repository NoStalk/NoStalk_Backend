import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send("Empty email");
  }
  if (!password) {
    return res.status(400).send("Empty password");
  }
  /**
   * check if user exists
   * The .exec() method runs the query and returns a Promise.
   */
  const foundUser = await userModel.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).send("Invalid email or password");
  }
  /**
   * check if password is correct
   * The .compare() method compares the plain text password with the hashed password in the database.
   * The .compare() method returns a Promise.
   * The .compare() method returns a boolean.
   *
   */
  const doesPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if (!doesPasswordMatch) {
    return res.status(401).send("Invalid email or password");
  }
  /**
   * Credentials are valid
   * Creating a jwt token signed with secret key store as environment variable(REFRESH_TOKEN_SECRET)
   * The .sign() method takes a payload and a secret as parameters.
   * The .sign() method returns a Promise.
   * We store the refresh token in the database
   * We send the signed token to the client as an HTTP-only cookie.
   */
  if (!process.env.REFRESH_TOKEN_SECRET) {
    const err = new Error("REFRESH_TOKEN_SECRET is not defined");
    console.error(err);
    return res.status(500).send(err.message);
  }

  console.log(foundUser);

  const userPayload = {
    email: foundUser.email,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  };
  

  const refreshToken = jwt.sign({email:foundUser.email}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  try {
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      //Secure true only in production.
      secure: (process.env.NODE_ENV === 'production'),
      //Max Age set 30 days in production(30 minutes otherwise).
      maxAge: (process.env.NODE_ENV === 'production') ? 1000 * 60 * 30:1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).send(userPayload);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Error saving refresh token to database or error in setting cookie");
  }
};

export default handleLogin;
