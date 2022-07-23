import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendUserDetailsWithCookie } from "../lib/controllerUtility";

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
   * check if password is correct if it 
   * The .compare() method compares the plain text password with the hashed password in the database.
   * The .compare() method returns a Promise.
   * The .compare() method returns a boolean.
   *
   */
  if (!foundUser.password) {
    return res.status(401).send("Invalid email or password");
  }
  const doesPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if (!doesPasswordMatch) {
    return res.status(401).send("Invalid email or password");
  }
  sendUserDetailsWithCookie(foundUser, res);
};

export default handleLogin;
