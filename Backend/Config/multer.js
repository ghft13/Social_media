import multer from "multer";
import { storage as cloudinaryStorage } from "./cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Local disk storage setup
export const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeName = base
      .replace(/[^\w\-]/g, "_") // replace all unsafe chars (e.g. #, &, etc)
      .substring(0, 100); // optional: truncate long names

    cb(
      null,
      Date.now() +
        "-" +
        Math.floor(Math.random() * 1000000000) +
        "-" +
        safeName +
        ext
    );
  },
});

// 🔹 Default upload middleware
const upload = multer({
  storage:
    process.env.NODE_ENV === "production" ? cloudinaryStorage : localStorage,
});

export default upload;
