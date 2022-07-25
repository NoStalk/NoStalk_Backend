import express from "express";
import handleGoogleOAuth from "../controllers/googleOAuthController";
import handleLinkedinOAuth from "../controllers/linkedinOAuthController";
import handleGithubOAuth from "../controllers/githubOAuthController";
const router = express.Router();



router.post('/google', handleGoogleOAuth);
router.post('/linkedin', handleLinkedinOAuth);
router.get('/github', handleGithubOAuth);

export default router;