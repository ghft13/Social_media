import UploadModel from "../Models/UploadModel.js"; // ✅ import model
import UserModel from "../Models/UserModel.js"; // Import User model


export const handleUpload = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // ✅ Use Cloudinary path in production, local path in development
    const filePath =
      process.env.NODE_ENV === "production"
        ? file.path  // Cloudinary returns full URL
        : `uploads/${file.filename}`.replace(/\\/g, "/"); // Local path with forward slashes

    console.log(req.user.username, "username from token");

    const newUpload = new UploadModel({
      title,
      desc,
      filename: file.filename,
      path: filePath,
      mimetype: file.mimetype,
      user: req.user.userId,
      username: req.user.username,
    });

    await newUpload.save();

    await UserModel.findByIdAndUpdate(req.user.userId, {
      $push: { posts: newUpload._id },
    });

    res.status(200).json({
      message: "Upload successful",
      data: newUpload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while uploading" });
  }
};


export const getUploads = async (req, res) => {
  try {
    const uploads = await UploadModel.find().sort({ createdAt: -1 }).populate('likes', 'username'); // Populate likes with usernames
    res.status(200).json({ uploads });
  } catch (error) {
    console.error("❌ Error in getUploads:", error);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};
export const GetLike = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ use from token
    const PostId = req.params.id;

    const post = await UploadModel.findById(PostId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes.pull(userId);
      user.likedPosts = user.likedPosts.filter(
        (id) => id.toString() !== PostId.toString()
      );
    } else {
      post.likes.push(userId);
      if (!user.likedPosts.includes(PostId)) {
        user.likedPosts.push(PostId);
      }
    }

    await post.save();
    await user.save();

    const populatedPost = await UploadModel.findById(PostId).populate(
      "likes",
      "username"
    );

    res.status(200).json({
      liked: !alreadyLiked,
      totalLikes: populatedPost.likes.length,
      likedBy: populatedPost.likes,
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getProfileData = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId)
      .populate("likedPosts")
      .populate("posts");

    // ✅ Populate likes with username and profileImage (if needed)
    const uploads = await UploadModel.find()
      .populate("user", "username profileImage")
      .populate("likes", "username profileImage");

    res.status(200).json({
      user,
      uploads,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

