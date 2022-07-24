import { Request, Response } from "express";
import userModel from "../models/userModel";
import axios from "axios";
import { sendUserDetailsWithCookie } from "../lib/controllerUtility";



/**
 *  The client requests the server for google oauth url
 * which upon success redirects to /google/callback route
 */
const handleGooogleOAuth = async (req: Request, res: Response) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        console.error("GOOGLE_CLIENT_ID is not defined");
        return res.status(500).send("GOOGLE_CLIENT_ID is not defined");
    }

    const { accessToken } = req.body

    if (!accessToken) {
        return res.status(400).send("Empty access token");
    }


    try {
        const userData = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
        let user = await userModel.findOne({ email: userData.data.email })
        if (!user) {
            user = await userModel.create({
                email: userData.data.email,
                firstName: userData.data.given_name,
                lastName: userData.data.family_name || "",
            })
        }
        console.log("sendinfg user details with cookie")
        sendUserDetailsWithCookie(user, res);
    } catch (error) {
        console.log(error);
    }

}



export default handleGooogleOAuth;
