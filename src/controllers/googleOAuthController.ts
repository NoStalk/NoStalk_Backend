import { Request, Response } from "express";
import userModel from "../models/userModel";
import axios from "axios";
import { sendUserDetailsWithCookie, setCookieAndRedirect } from "../lib/controllerUtility";

import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { StringMappingType } from "typescript";



/**
 *  The client requests the server for google oauth url
 *  which upon success redirects to /google/callback route
 */
const handleGooogleOAuth = async (req: Request, res: Response) => {
    /**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
    if (!process.env.GOOGLE_CLIENT_ID) {
        console.error("GOOGLE_CLIENT_ID is not set");
        return res.status(500).send("GOOGLE_CLIENT_ID is not set");
    }
    if (!process.env.GOOGLE_CLIENT_SECRET) {
        console.error("GOOGLE_CLIENT_SECRET is not set");
        return res.status(500).send("GOOGLE_CLIENT_SECRET is not set");
    }
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL is not set");
        return res.status(500).send("BACKEND_URL is not set");
    }
    /**
    * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
    * from the client_secret.json file. To get these credentials for your application, visit
    * https://console.cloud.google.com/apis/credentials.
    */
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET,
        process.env.BACKEND_URL + "/oauth/google/callback"
    );

    // Access scopes for email and profile.
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];

    // Generate a url that asks permissions for the required scopes.
    const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default), 'offline' (gets refresh_token)
        access_type: 'online',
        scope: scopes,
        state: req.query.path as string,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true
    });
    res.redirect(authorizationUrl);
}

/**
 * Called after the user has authenticated with google 
 * gets users profile and email through appropriate apis and access token
 * calls @function setCookieAndRedirect to set cookie and redirect to the provided path
 */
export const handleGoogleOAuthCallback = async (req: Request, res: Response) => {
    let { code, state } = req.query;
    console.log(state);
    if (!code) {
        console.error("No code received");
        return res.status(400).send("No code found in query");
    }
    if(!state) state = "/";
    /**
     * Creates a new oauth2Client to get an access token.
     * gets the access token using the code provided in the query
     * gets the users profile and email using google.oauth2.userinfo.get()
     * upon callback with credentials userModel.getUserandCreateUserIfNotExist is called to get user reference and create user if not exist
     * then setCookieAndRedirect is called to set cookie and redirect to the provided path
     */

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.BACKEND_URL + "/oauth/google/callback"
    );

    let { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });

    oauth2.userinfo.get(async (error, response) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!response?.data?.email) {
            console.error("No email in response", response);
            return;
        }
        if (!response?.data?.given_name) {
            console.error("No given_name in response", response);
            return;
        }
        if (!response?.data?.family_name) {
            console.error("No family_name in response", response);
            return;
        }

        const user = await userModel.getUserandCreateUserIfNotExist(response.data.email, response.data.given_name, response.data.family_name);

        setCookieAndRedirect(user, res, state as string);

    });

}



export default handleGooogleOAuth;
