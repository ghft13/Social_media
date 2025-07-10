import express from "express";
import { Signup,login,logout } from "../Controllers/authController.js";
import { verifyToken } from "../Middleware/verifyToken.js";
const router = express.Router();

router.post("/signup", Signup); // POST /api/auth/signup
router.get("/verify", verifyToken, (req, res) => {res.json({ success: true, user: req.user });})
router.post("/login",login)
router.post('/logout',logout)

export default router;
