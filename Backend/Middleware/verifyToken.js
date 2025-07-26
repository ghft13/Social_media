import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      email: decoded.email,
    };

    // 🔄 Refresh cookie with sliding expiration
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // use HTTPS in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days from now
    });

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
