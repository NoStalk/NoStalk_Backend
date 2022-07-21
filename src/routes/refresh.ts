import express from "express";
import handleRefresh from "../controllers/refreshController";
const router = express.Router();
import cors from 'cors'


router.get('/', handleRefresh);

export default router;