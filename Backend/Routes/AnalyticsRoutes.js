import express from "express";
const router=express.Router();
import {updateAnalytics} from '../Controllers/Analytics.js'
import { verifyToken } from "../Middleware/verifyToken.js";

router.post('/:id',verifyToken,updateAnalytics);

export default router