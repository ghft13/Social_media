import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "UploadModel" }],
  profileImage: {
    type: String, // store image path or URL
    default: "",  // default can be a placeholder image
  },
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadModel", // reference to Post model
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
