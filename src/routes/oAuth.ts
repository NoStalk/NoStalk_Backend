import express from "express";
import handleGoogleOAuth from "../controllers/googleOAuthController";
const router = express.Router();



router.post('/google', handleGoogleOAuth);

export default router;