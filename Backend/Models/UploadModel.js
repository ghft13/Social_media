import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    files: [{ filename: String, path: String, mimetype: String }],
    username: String,
    category: String,
    views: {
      type: Number,
      default: 0,
    },
    watchTime: {
      type: Number,
      default: 0, // in seconds
    },
    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("UploadModel", uploadSchema);
