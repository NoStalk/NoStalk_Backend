import { Express, Request, Response } from "express";
import userModel from "../models/userModel";
// Language: typescript

/**
 * function to validate email
 * @param email
 * @returns true if email is valid
 */
const isValidEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * function to validate password
 * @param password
 * @returns true if password is valid
 */

const isValidPassword = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
};

/**
 * function to register a user
 * @param req
 * @param res
 * 
 */

const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  /**
   * Validating body parameters in the request
   */
  if (!email) {
    return res.status(400).send("Empty email");
  }
  if (!isValidEmail(email)) {
    return res.status(400).send("Invalid email");
  }
  if (!password) {
    return res.status(400).send("Empty password");
  }
  if (!isValidPassword(password)) {
    return res.status(400).send("Weak password");
  }
  if (!firstName) {
    return res.status(400).send("Empty name");
  }
  /**
   * check if user already exists
   * The .exec() method runs the query and returns a Promise.
   */
  if ((await userModel.findOne({ email }).exec()) !== null) {
    return res.status(409).send("User already exists");
  }
  /**
   * create a new user
   * The .create() is a thin wrapper around the Mongoose .save() method.
   * The .save() method inserts a document into the collection if it does not exist,
   * or updates an existing document if it does.
   * The .create() method returns a Promise.
   * The .create() method is equivalent to running the .save() and then awaiting the result.
   */
  try {
    const user = await userModel.create({
      email,
      password,
      firstName,
      lastName,
      platformData: {
        leetcode: {
          handle: "zeus",
          totalSolved: 10,
          ranking: 1,
          contests: [],
          submissions: [],
        },
      },
    });
    console.log(user);
    res.status(201).send(`New User with email ${email} created!`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
};

export default registerUser;
