import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

const handleRefresh = async (req: Request, res: Response) => {
  
  
  return res.status(200).send({
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });

};

export default handleRefresh;
