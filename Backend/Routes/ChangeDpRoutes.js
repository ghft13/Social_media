import express from "express";
import { updateProfileImage } from "../Controllers/ChangeDpController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../Config/multer.js";
const router = express.Router();

router.post("/update-dp",upload.single("file"), verifyToken, updateProfileImage);

export default router;