import { Request, Response } from "express";
import userModel from "../models/userModel";
import makeUnaryRequest from "../helpers/condforcesGRPCConnector";





const handleCodeforces = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send("Empty email");
    }
    const foundUser = await userModel.findOne({ email }).exec();
    if (!foundUser) {
        return res.status(400).send("User not found");
    }
    const userCFHandle = foundUser.platformData.codeforces?.handle; 

    makeUnaryRequest();
    res.sendStatus(200);
}


export default handleCodeforces;