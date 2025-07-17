import UploadModel from "../Models/UploadModel.js"; // ✅ import model
import UserModel from "../Models/UserModel.js"; // Import User model
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import { cloudinary } from "../Config/cloudinary.js";

// ✅ Get local video duration
const getVideoDurationLocal = (filePath) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(err);
      resolve(metadata.format.duration);
    });
  });

// ✅ Get Cloudinary video duration
const getVideoDurationCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.api.resource(public_id, {
      resource_type: "video",
    });
    return result.duration;
  } catch (err) {
    throw new Error("Cloudinary API error: " + err.message);
  }
};

// ✅ Extract public_id from Cloudinary URL
const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1].split(".")[0];
  return `chillplay_uploads/${fileName}`;
};

export const handleUpload = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const isProduction = process.env.NODE_ENV === "production";

    // ✅ Validate video durations
    for (const file of files) {
      const isVideo = file.mimetype.startsWith("video/");
      if (!isVideo) continue;

      if (isProduction) {
        const public_id = extractPublicId(file.path);
        const duration = await getVideoDurationCloudinary(public_id);

        if (duration > 30) {
          await cloudinary.uploader.destroy(public_id, {
            resource_type: "video",
          });
          return res.status(400).json({
            error: `The video "${file.originalname}" is ${Math.round(
              duration
            )} seconds long. Videos must be 30 seconds or less.`,
            tip: "Please upload a shorter video.",
          });
        }
      } else {
        const duration = await getVideoDurationLocal(file.path);
        if (duration > 30) {
          fs.unlinkSync(file.path);
          return res.status(400).json({
            error: `The video "${file.originalname}" is ${Math.round(
              duration
            )} seconds long. Videos must be 30 seconds or less.`,
            tip: "Please upload a shorter video.",
          });
        }
      }
    }

    const fileData = files.map((file) => ({
      filename: file.filename,
     path: `uploads/${file.filename}`.replace(/\\/g, "/"),
       
      mimetype: file.mimetype,
    }));

    console.log(fileData)

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
    console.error("Upload error:", error);
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
