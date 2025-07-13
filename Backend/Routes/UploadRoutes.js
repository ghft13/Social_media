import express from "express";
import { handleUpload,getUploads,GetLike,getProfileData} from "../Controllers/uploadController.js";
import upload from "../Config/multer.js"; // ✅ must include `.js`
import { verifyToken } from "../Middleware/verifyToken.js";
import { storage } from '../Config/cloudinary.js';
const router = express.Router();

router.post("/upload", upload.array("files",10),verifyToken, handleUpload);
router.get("/all", getUploads);
router.post("/:id/like",verifyToken,GetLike)
router.get("/profile-data", verifyToken, getProfileData);
export default router;
