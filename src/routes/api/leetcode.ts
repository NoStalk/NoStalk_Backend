import express from "express";
import handleLeetcodeDBData from "../../controllers/leetcodeController";
const router = express.Router();



router.get("/", handleLeetcodeDBData);

export default router;