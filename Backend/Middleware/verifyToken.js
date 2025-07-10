import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId, // Attach to request
      username: decoded.username, // Attach username to request
      email: decoded.email, // Attach email to request
    };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "invalid Token  " });
  }
};
