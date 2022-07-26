import express from "express";
import handleGoogleOAuth, { handleGoogleOAuthCallback } from "../controllers/googleOAuthController";
import handleLinkedinOAuth from "../controllers/linkedinOAuthController";
import handleGithubOAuth from "../controllers/githubOAuthController";
const router = express.Router();



router.get('/google', handleGoogleOAuth);
router.get('/google/callback', handleGoogleOAuthCallback);
router.post('/linkedin', handleLinkedinOAuth);
router.get('/github', handleGithubOAuth);

export default router;