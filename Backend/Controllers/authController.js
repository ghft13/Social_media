import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import { generateToken } from "../Utils/generateToken.js";

const Signup = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

  const token = generateToken({ userId: newUser._id, email: newUser.email,username:newUser.username});

    await newUser.save();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ message: "Account has been Created", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
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

    const token = generateToken({ userId: user._id, email: user.email, username: user.username });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          username: user.username,
          userId: user._id,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export { Signup, login, logout };
