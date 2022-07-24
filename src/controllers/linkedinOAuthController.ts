import { Request, Response } from "express";
import userModel from "../models/userModel";
import axios from "axios";
import { sendUserDetailsWithCookie } from "../lib/controllerUtility";

/**
 * The client requests the server for linkedin oauth url
 * which upon success redirects to /linkedin/callback route
 * @param req
 * @param res
 */

const handleLinkedinOAuth = async (req: Request, res: Response) => {
  if (!process.env.LINKEDIN_CLIENT_ID) {
    console.error("LINKEDIN_CLIENT_ID is not defined");
    return res.status(500).send("LINKEDIN_CLIENT_ID is not defined");
  }
  if (!process.env.LINKEDIN_CLIENT_SECRET) {
    console.error("LINKEDIN_CLIENT_SECRET is not defined");
    return res.status(500).send("LINKEDIN_CLIENT_SECRET is not defined");
  }

  const { authorizationToken } = req.body;

  if (!authorizationToken) {
    return res.status(400).send("Empty authorization token");
  }
 
  try {
    const response = await axios.post(
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authorizationToken}&redirect_uri=${process.env.FRONTEND_URL}/linkedin&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`
    );

    const accessToken = response.data.access_token;

    const linkedinEmailPromise = axios.get(
      `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${accessToken}`
    );
    const linkedinProfileDataPromise = axios.get(
      `https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,emailAddress,profilePicture(displayImage~:playableStreams))&oauth2_access_token=${accessToken}`
    );
    /**
     * Promise.all is used to wait for all the promises to be resolved
     * before executing the next line of code
     * The promises are resolved concurrently
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
     */
    const [linkedinEmailResponse, linkedinDataResponse] = await Promise.all([
      linkedinEmailPromise,
      linkedinProfileDataPromise,
    ]);

    const email =
      linkedinEmailResponse.data.elements[0][`handle~`].emailAddress;
    const firstName = linkedinDataResponse.data.firstName.localized[Object.keys(linkedinDataResponse.data.firstName.localized)[0]];
    const lastName = linkedinDataResponse.data.lastName.localized[Object.keys(linkedinDataResponse.data.lastName.localized)[0]];
      console.log(email, firstName, lastName);
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        email: email,
        firstName,
        lastName,
      });
    }
    sendUserDetailsWithCookie(user, res);
  } catch (error) {
    console.log(error);
  }
};


export default handleLinkedinOAuth;