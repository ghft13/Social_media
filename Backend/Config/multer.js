import multer from "multer";
import { storage as cloudinaryStorage } from "./cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true }); // make sure folder exists
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage:
    process.env.NODE_ENV === "production" ? cloudinaryStorage : localStorage,
});

export default upload;
