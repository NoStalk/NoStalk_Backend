import { Request, Response } from "express";
import userModel from "../models/userModel";
import { platformDataSchema } from "../models/platformDataModel";


// const handleRequestType = async (req: Request, res: Response) => { 
//     const { email } = req.body;
//     const { handle } = req.params;
//     if (email){
//         return handleLeetcodeDBData(req, res);
//     }
//     else if(handle){
//         return handleLeetcodeHandleData(req, res);
//     }
//     else {
//         return res.status(400).send("Empty email or handle");
//     }
// }



const handleLeetcodeDBData = async (req: Request, res: Response) => { 
    const { email } = req.body;
    if(!email) {
        return res.status(400).send("Empty email");
    }
    const foundUser = await userModel.findOne({ email }).exec();
    if (!foundUser) {
        return res.status(400).send("User not found");
    }

    if (foundUser.platformData.leetcode) {
        foundUser.platformData.leetcode.handle = "asif";
        await foundUser.save();
        res.status(200).send(foundUser.platformData.leetcode);
    }
}



export default handleLeetcodeDBData