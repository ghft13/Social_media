import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaArrowLeftLong, FaHeart, FaImages } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { useRef } from "react";
import axios from "axios";
function Profile() {
  const { user, uploads, fetchProfileData, currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("liked"); // liked | created

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // ✅ match backend field name

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-dp`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchProfileData(); // refresh user data
    } catch (error) {
      console.error("Failed to update DP", error);
    }
  };

  useEffect(() => {
    fetchProfileData(); // fetch fresh uploads and user
  }, []);

  const totalPostByUser = uploads.filter(
    (post) => post.user?._id === user?._id
  );

  const likedPostsByUser = uploads.filter((post) => {
    if (post.likes?.length > 0) {
      return typeof post.likes[0] === "object"
        ? post.likes.some((u) => u._id === user?._id)
        : post.likes.includes(user?._id);
    }
    return false;
  });

  const displayedPosts =
    activeTab === "liked" ? likedPostsByUser : totalPostByUser;

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-white text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <FaArrowLeftLong
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        />
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm font-medium">
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col items-center mb-10 relative">
        <div className="w-32 h-32 rounded-full border-2 border-black overflow-hidden">
          <img
            src={
              user?.profileImage?.startsWith("http")
                ? user.profileImage
                : `${import.meta.env.VITE_BACKEND_URL}/${user.profileImage}`
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-xl font-semibold mt-4 capitalize">
          {user?.username || "Username"}
        </h1>

        <button
          onClick={() => fileInputRef.current.click()}
          className="text-sm mt-2 text-blue-600 hover:underline"
        >
          Change
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-10 justify-center items-center mb-10">
        <div
          onClick={() => setActiveTab("liked")}
          className={`text-center cursor-pointer transition-all ${
            activeTab === "liked" ? "text-black font-bold" : "text-gray-500"
          }`}
        >
          <h2 className="text-sm mb-1">Liked Posts</h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>{likedPostsByUser.length}</span>
            <FaHeart />
          </div>
        </div>

        <div
          onClick={() => setActiveTab("created")}
          className={`text-center cursor-pointer transition-all ${
            activeTab === "created" ? "text-black font-bold" : "text-gray-500"
          }`}
        >
          <h2 className="text-sm mb-1">Total Posts</h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>{totalPostByUser.length}</span>
            <FaImages />
          </div>
        </div>
      </div>

      {/* Posts Display */}
      <div className="Posts px-4 py-6 bg-gray-50 rounded-2xl shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {activeTab === "liked" ? "Posts You Liked" : "Your Posts"}
        </h2>

        {displayedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts to display.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-1">
            {displayedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                userId={currentUser?.userId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
