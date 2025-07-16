import UploadModel from "../Models/UploadModel.js"; // ✅ import model
import UserModel from "../Models/UserModel.js"; // Import User model

export const handleUpload = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const files = req.files; // Use the uploaded files array

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const isProduction = process.env.NODE_ENV === "production";

    // Prepare file data array
    const fileData = files.map((file) => ({
      filename: file.filename,
      path: isProduction
        ? file.path
        : `uploads/${file.filename}`.replace(/\\/g, "/"),
      mimetype: file.mimetype,
    }));

    // Save one post with multiple files
    const newUpload = new UploadModel({
      title,
      desc,
      files: fileData,
      user: req.user.userId,
      username: req.user.username,
    });

    await newUpload.save();

    await UserModel.findByIdAndUpdate(req.user.userId, {
      $push: { posts: newUpload._id },
    });

    res.status(200).json({
      message: "Post uploaded successfully with multiple files",
      data: newUpload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while uploading" });
  }
};

export const getUploads = async (req, res) => {
  try {
    const uploads = await UploadModel.find()
      .sort({ createdAt: -1 })
      .populate("likes", "username"); // Populate likes with usernames
    res.status(200).json({ uploads });
  } catch (error) {
    console.error("❌ Error in getUploads:", error);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};

// export const GetLike = async (req, res) => {
//   try {
//     const userId = req.user.userId; // ✅ use from token
//     const PostId = req.params.id;

//     const post = await UploadModel.findById(PostId);
//     if (!post) return res.status(404).json({ error: "Post not found" });

//     const user = await UserModel.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const alreadyLiked = post.likes.some(
//       (id) => id.toString() === userId.toString()
//     );

//     if (alreadyLiked) {
//       post.likes.pull(userId);
//       user.likedPosts = user.likedPosts.filter(
//         (id) => id.toString() !== PostId.toString()
//       );
//     } else {
//       post.likes.push(userId);
//       if (!user.likedPosts.includes(PostId)) {
//         user.likedPosts.push(PostId);
//       }
//     }

//     await post.save();
//     await user.save();

//     const populatedPost = await UploadModel.findById(PostId).populate(
//       "likes",
//       "username"
//     );

//     res.status(200).json({
//       liked: !alreadyLiked,
//       totalLikes: populatedPost.likes.length,
//       likedBy: populatedPost.likes,
//     });
//   } catch (err) {
//     console.error("Like error:", err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

export const GetLike = async (req, res) => {
  try {
    const userId = req.user.userId;
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
      "username profileImage" // ✅ includes both username and profileImage
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

// export const getProfileData = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const user = await UserModel.findById(userId)
//       .populate("likedPosts")
//       .populate("posts");

//     // ✅ Populate likes with username and profileImage (if needed)
//     const uploads = await UploadModel.find()
//       .populate("user", "username profileImage")
//       .populate("likes", "username profileImage");

//     res.status(200).json({
//       user,
//       uploads,
//     });
//   } catch (err) {
//     console.error("Profile fetch error:", err);
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };

export const getProfileData = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await UserModel.findById(userId)
      .populate({
        path: "likedPosts",
        populate: [
          { path: "user", select: "username profileImage" },
          { path: "likes", select: "username profileImage" },
        ],
      })
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "username profileImage" },
          { path: "likes", select: "username profileImage" },
        ],
      });

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

export const DeletePost = async (req, res) => {
  const { postId } = req.params;
 
  if (!postId) {
    return res.status(400).json({ message: "Post Id is required" });
  }

  try {
    await UploadModel.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error });
  }
};
