import express from "express";
import { updateProfileImage,UpdateProfileData, GetUserPost} from "../Controllers/ChangeDpController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
import upload from "../Config/multer.js";
const router = express.Router();

router.post("/update-dp",upload.single("file"), verifyToken, updateProfileImage);
router.post("/update-profile",verifyToken,UpdateProfileData)
router.get("/:user",GetUserPost)
export default router;