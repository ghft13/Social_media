// controllers/userController.js
import UserModel from "../Models/UserModel.js"; // Import User model

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

    res.status(200).json({ message: "Profile image updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile image:", err);
    res.status(500).json({ error: "Failed to update profile image" });
  }
};
