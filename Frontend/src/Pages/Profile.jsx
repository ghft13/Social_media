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
    <div className="w-full min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto sm:max-w-2xl">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
          >
            <FaArrowLeftLong className="text-xl text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          <button
            onClick={() => navigate("/Edit")}
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 active:bg-black transition-all duration-200"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto sm:max-w-2xl px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Profile Picture */}
            {user && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200">
                  <img
                    src={
                      user.profileImage?.startsWith("http")
                        ? user.profileImage
                        : `${import.meta.env.VITE_BACKEND_URL}/${
                            user.profileImage
                          }`
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
            
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
            )}

            {/* User Info */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-gray-900 capitalize">
                {user?.username || "Username"}
              </h1>
              <button
                onClick={() => fileInputRef.current.click()}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 active:text-blue-800"
              >
                {LoadingDp ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Change profile picture
                    <FaUserEdit className="text-xs" />
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

            {/* Stats Row */}
            <div className="flex gap-12 pt-2">
              <button
                onClick={() => setActiveTab("liked")}
                className={`text-center transition-all duration-200 ${
                  activeTab === "liked" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                <div className="text-lg font-bold">{likedPosts.length}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <FaHeart
                    className={activeTab === "liked" ? "text-red-500" : ""}
                  />
                  Liked
                </div>
              </button>

              <button
                onClick={() => setActiveTab("created")}
                className={`text-center transition-all duration-200 ${
                  activeTab === "created" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                <div className="text-lg font-bold">{createdPosts.length}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <FaImages
                    className={activeTab === "created" ? "text-blue-500" : ""}
                  />
                  Posts
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-md mx-auto sm:max-w-2xl flex">
          <button
            onClick={() => setActiveTab("liked")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
              activeTab === "liked"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <FaHeart className="inline mr-2" />
            Liked Posts
          </button>
          <button
            onClick={() => setActiveTab("created")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
              activeTab === "created"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <FaImages className="inline mr-2" />
            Your Posts
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="bg-gray-50 min-h-screen">
        {displayedPosts.length === 0 ? (
          // Empty State
          <div className="max-w-md mx-auto sm:max-w-2xl px-4 py-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                {activeTab === "liked" ? (
                  <FaHeart className="text-2xl text-gray-400" />
                ) : (
                  <FaImages className="text-2xl text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab === "liked"
                  ? "No liked posts yet"
                  : "No posts created yet"}
              </h3>
              <p className="text-gray-500 text-sm">
                {activeTab === "liked"
                  ? "Posts you like will appear here"
                  : "Share your first post to get started"}
              </p>
              {activeTab === "created" && (
                <button
                  onClick={() => navigate("/create")}
                  className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Create Post
                </button>
              )}
            </div>
          </div>
        ) : (
          // Posts Feed - Identical to Home Feed
          <div className="max-w-md mx-auto sm:max-w-2xl px-1">
            <div className="space-y-0">
              {" "}
              {/* No gaps for seamless mobile experience */}
              {displayedPosts.map((post, index) => (
                <div key={post._id} className="relative">
                  {/* Add subtle separator between posts for better visual hierarchy */}
                  {index > 0 && (
                    <div className="h-2 bg-gray-100 border-t border-gray-200"></div>
                  )}
                  <PostCard
                    post={post}
                    userId={currentUser?.userId}
                    HandleDeletePost={HandleDeletePost}
                    activeTab={activeTab}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-16 sm:h-4"></div>
    </div>
  );
}

export default Profile;
