// controllers/userController.js
import UserModel from "../Models/UserModel.js"; // Import User model
import bcrypt from "bcryptjs";
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔁 Use Cloudinary URL in production, local path in development
    const imagePath =
      process.env.NODE_ENV === "production"
        ? req.file.path // Cloudinary returns full URL
        : `uploads/${req.file.filename}`.replace(/\\/g, "/"); // Local path with forward slashes

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profileImage: imagePath },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Profile image updated", user: updatedUser });
  } catch (err) {
    // //console.error("Error updating profile image:", err);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};

export const UpdateProfileData = async (req, res) => {
  const { username, previousEmail, email, oldPassword, newPassword } = req.body;
 
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Track whether anything changed
    let updatedFields = [];

    // ✅ Username update
    if (username && username !== user.username) {
      user.username = username;
      updatedFields.push("username");
    }

    // ✅ Email update with previousEmail verification
    if (previousEmail && email && email !== user.email) {
      if (user.email !== previousEmail) {
        return res
          .status(400)
          .json({ error: "Previous email does not match our records" });
      }
      user.email = email;
      updatedFields.push("email");
    }

    // ✅ Password update
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      updatedFields.push("password");
    }

    // ✅ Save only if changes exist
    if (updatedFields.length > 0) {
      await user.save();
      return res
        .status(200)
        .json({ message: `Updated: ${updatedFields.join(", ")}` });
    } else {
      return res.status(400).json({ message: "No changes made" });
    }
  } catch (error) {
    // //console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
