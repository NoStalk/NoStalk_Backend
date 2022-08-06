import express from "express";
import handleCodeforces from "../../controllers/codeforcesController";
const router = express.Router();




router.get('/', handleCodeforces);


export default router;