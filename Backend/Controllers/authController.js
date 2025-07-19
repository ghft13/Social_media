import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import { generateToken } from "../Utils/generateToken.js";
import supabase from "../Config/supabase.js";

// const isProduction = process.env.NODE_ENV === "production";
const Signup = async (req, res) => {
  const { email, password, username } = req.body;

  // Basic field validation (moved to top)
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password strength validation
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    // Save user first
    await newUser.save();

    // ✅ NOW create Supabase user AFTER successful DB save
    const { data: supabaseUser, error: supabaseError } =
      await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true, // Auto-confirm the email
      });

    if (supabaseError) {
      console.error("Supabase user creation error:", supabaseError);
      
    }

    // Generate JWT token
    const token = generateToken({
      userId: newUser._id,
      email: newUser.email,
      username: newUser.username,
    });

    const isProduction = process.env.NODE_ENV === "production";

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(201)
      .json({
        message: "Account has been created",
        user: {
          username: newUser.username,
          userId: newUser._id,
          email: newUser.email,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const user = await User.findOne({ email: loginEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(loginPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user._id,
      email: user.email,
      username: user.username,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          username: user.username,
          userId: user._id,
          email: user.email,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { Signup, login, logout };
