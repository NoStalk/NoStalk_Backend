import express from "express";
import handleGoogleOAuth from "../controllers/googleOAuthController";
import handleLinkedinOAuth from "../controllers/linkedinOAuthController";
const router = express.Router();



router.post('/google', handleGoogleOAuth);
router.post('/linkedin', handleLinkedinOAuth);

export default router;