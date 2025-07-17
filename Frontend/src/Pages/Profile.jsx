import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaArrowLeftLong, FaHeart, FaImages } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const { user, fetchProfileData, currentUser,HandleDeletePost} = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("liked");
  const [LoadingDp, setLoadingDp] = useState(false);
  const fileInputRef = useRef(null);

  const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoadingDp(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-dp`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
      }
      fetchProfileData();
    } catch (error) {
      toast.error("Failed to update profile picture");
      //console.error("Error:", error);
    } finally {
      setLoadingDp(false);
    }
  };

  const likedPosts = user?.likedPosts || [];
  const createdPosts = user?.posts || [];

  const displayedPosts = activeTab === "liked" ? likedPosts : createdPosts;



  return (
    <div className="w-full min-h-screen px-4 py-6 bg-white text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <FaArrowLeftLong
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button onClick={()=>navigate('/Edit')} className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm font-medium">
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
          className="text-sm mt-2 text-blue-600 hover:underline font-bold"
        >
          {LoadingDp ? (
            "Changing Your Profile Picture..."
          ) : (
            <span>
              Change Your profile picture <FaUserEdit className="inline ml-1" />
            </span>
          )}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex gap-10 justify-center items-center mb-10">
        <div
          onClick={() => setActiveTab("liked")}
          className={`text-center cursor-pointer transition-all ${
            activeTab === "liked" ? "text-black font-bold" : "text-gray-500"
          }`}
        >
          <h2 className="text-sm mb-1">Liked Posts</h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>{likedPosts.length}</span>
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
            <span>{createdPosts.length}</span>
            <FaImages />
          </div>
        </div>
      </div>

      <div className="Posts px-4 py-6 bg-gray-50 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">
          {activeTab === "liked" ? "Posts You Liked" : "Your Posts"}
        </h2>

        {displayedPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 w-full">
            {displayedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                userId={currentUser?.userId}
                HandleDeletePost={HandleDeletePost}
                activeTab={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
