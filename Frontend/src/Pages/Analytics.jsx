import React, { useEffect } from "react";
import PostCard from "../Components/PostCard";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong} from "react-icons/fa6";
const Analytics = () => {

   const navigate = useNavigate();
  const { uploads, currentUser, getAllPost } = useAuth();
 
  useEffect(() => {
    getAllPost();
  }, []);

  // Calculate total analytics
  const totalViews = uploads.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalWatchTime = uploads.reduce(
    (sum, post) => sum + (post.watchTime || 0),
    0
  );
  const totalPosts = uploads.length;

  // Format watch time (assuming it's in seconds)
  const formatWatchTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor(
      (seconds % 3600) / 60
    )}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between px-6 py-4">
          <FaArrowLeftLong
            className="text-2xl cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-200 hover:scale-110 transform"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Track your post performance and engagement metrics
          </p>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Posts */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900">{totalPosts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
          </div>

          {/* Total Watch Time */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Watch Time
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatWatchTime(totalWatchTime)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <p className="text-sm text-gray-600 mt-1">
              Individual post performance metrics
            </p>
          </div>

          <div className="p-6">
            {uploads.length > 0 ? (
              <div className="space-y-6">
                {uploads.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    {/* Post Card */}
                    <PostCard
                      post={item}
                      userId={currentUser?.userId}
                      activeTab="analytics"
                    />

                    {/* Analytics Data */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {item.views || 0}
                          </div>
                          <div className="text-sm text-gray-600">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {formatWatchTime(item.watchTime || 0)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Watch Time
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {item.likes ? item.likes.length : 0}
                          </div>
                          <div className="text-sm text-gray-600">Likes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-gray-400">📊</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first post to start tracking analytics
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Create Post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Analytics Section */}
        {uploads.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Average Views per Post
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Average Watch Time per Post
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalPosts > 0
                    ? formatWatchTime(Math.round(totalWatchTime / totalPosts))
                    : "0s"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
