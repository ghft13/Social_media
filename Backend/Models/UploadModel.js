import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    filename: String,
    path: String,
    mimetype: String,
     username: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export default mongoose.model("UploadModel", uploadSchema);
