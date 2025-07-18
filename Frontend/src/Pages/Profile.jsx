import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaArrowLeftLong, FaHeart, FaImages } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const { user, fetchProfileData, currentUser, HandleDeletePost } = useAuth();
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <FaArrowLeftLong
            className="text-2xl cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-200 hover:scale-110 transform"
            onClick={() => navigate("/")}
          />
          <button 
            onClick={() => navigate('/Edit')} 
            className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-2.5 rounded-full hover:from-gray-900 hover:to-gray-800 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="px-6 py-8">
       
        <div className="flex flex-col items-center mb-12 relative">
     
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-full border-1 border-white shadow-2xl overflow-hidden  p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
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
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg"></div>
          </div>

          {/* User Info */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
              {user?.username || "Username"}
            </h1>
            <button
              onClick={() => fileInputRef.current.click()}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
            >
              {LoadingDp ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Changing Your Profile Picture...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Change Your profile picture 
                  <FaUserEdit className="text-sm" />
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
        </div>

        {/* Stats Tabs */}
        <div className="flex gap-8 justify-center items-center mb-10">
          <div
            onClick={() => setActiveTab("liked")}
            className={`text-center cursor-pointer transition-all duration-300 p-4 rounded-xl hover:scale-105 transform ${
              activeTab === "liked" 
                ? "bg-gradient-to-r from-red-50 to-pink-50 text-red-600 shadow-lg border-2 border-red-200" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <h2 className="text-sm mb-2 font-medium">Liked Posts</h2>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span>{likedPosts.length}</span>
              <FaHeart className={`transition-colors duration-300 ${
                activeTab === "liked" ? "text-red-500" : "text-gray-400"
              }`} />
            </div>
          </div>

          <div
            onClick={() => setActiveTab("created")}
            className={`text-center cursor-pointer transition-all duration-300 p-4 rounded-xl hover:scale-105 transform ${
              activeTab === "created" 
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-lg border-2 border-blue-200" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <h2 className="text-sm mb-2 font-medium">Total Posts</h2>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span>{createdPosts.length}</span>
              <FaImages className={`transition-colors duration-300 ${
                activeTab === "created" ? "text-blue-500" : "text-gray-400"
              }`} />
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8 w-full max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-2">
              {activeTab === "liked" ? "Posts You Liked" : "Your Posts"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          {/* Posts Content */}
          {displayedPosts.length === 0 ? (
            <div clas sName="text-center py-16">
              
              <p className="text-gray-500 text-lg font-medium mb-4">
                {activeTab === "liked" ? "No liked posts yet" : "No posts created yet"}
              </p>
              <p className="text-gray-400 text-sm">
                {activeTab === "liked" 
                  ? "Start exploring and like some posts!" 
                  : "Create your first post to get started!"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 w-full">
              {displayedPosts.map((post, index) => (
                <div 
                  key={post._id}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard
                    post={post}
                    userId={currentUser?.userId}
                    HandleDeletePost={HandleDeletePost}
                    activeTab={activeTab}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;