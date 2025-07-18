import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./Config/Db.js"; // make sure Db.js uses export default
import AuthRoutes from "./Routes/AuthRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./Routes/UploadRoutes.js"; // Ensure this is the correct import path
import ChangeDpRoutes from "./Routes/ChangeDpRoutes.js"; // Ensure this is the correct import path
import AnalyticsRoutes from "./Routes/AnalyticsRoutes.js"
dotenv.config();

const app = express();


if (process.env.NODE_ENV === "development") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}



app.use(
  cors({
    origin: ["http://localhost:5173",
       "https://social-media18.netlify.app"
      ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hey");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/posts", uploadRoutes);
app.use("/api/user", ChangeDpRoutes);
app.use("/api/posts/analytics",AnalyticsRoutes);

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
console.log(`✅ Server running on port ${PORT}`);
});
