import { Request, Response } from "express";
import userModel from "../models/userModel";
import axios from "axios";
import { sendUserDetailsWithCookie } from "../lib/controllerUtility";

/**
 * The client requests the server for github oauth url
 * which upon success redirects to /github/callback route
 * @param req
 * @param res
 */

const handleGithubOAuth = async (req: Request, res: Response) => {
  const from = req.query.path;
  const authorizationToken = req.query.code;

  console.log(from);
  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${authorizationToken}&redirect_uri=${process.env.BACKEND_URL}/oauth/github`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseString = response.data;
    const accessToken = responseString.split("&")[0].split("=")[1];
    //console.log(response);
    const githubProfileDataPromise = axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const githubEmailPromise = axios.get(`https://api.github.com/user/emails`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const [githubProfileDataResponse, githubEmailResponse] = await Promise.all([
      githubProfileDataPromise,
      githubEmailPromise,
    ]);
    const email = githubEmailResponse.data[0].email;
    const firstName = githubProfileDataResponse.data.name;
    const user = await userModel.getUserandCreateUserIfNotExist(
      email,
      firstName
    );
    // sendUserDetailsWithCookie(user, res);
    // res.redirect(`${process.env.FRONTEND_URL}`,);
    res.redirect(
      `${process.env.FRONTEND_URL}/callback?email=${email}&firstName=${firstName}&path=${from}`
    );
  } catch (error) {
    console.log(error);
  }
};

export default handleGithubOAuth;
