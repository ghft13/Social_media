import axios from "axios";
import React from "react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
function PostCard({ post, userId }) {
  const Backend_Url = import.meta.env.VITE_Backend_URL;
  const mediaURL = `${Backend_Url}/${post.path}`;
  const { currentUser, fetchProfileData } = useAuth();

  const [likedBy, setLikedBy] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setlikes] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showLikesModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showLikesModal]);

  useEffect(() => {
    if (post.likes && post.likes.length > 0) {
      const isPopulated =
        typeof post.likes[0] === "object" && post.likes[0]?.username;

      setLikedBy(post.likes); // works in both cases
      setLikeCount(post.likes.length);

      if (isPopulated) {
        setlikes(post.likes.some((user) => user._id === currentUser?.userId));
      } else {
        setlikes(post.likes.includes(currentUser?.userId));
      }
    } else {
      setLikedBy([]);
      setLikeCount(0);
      setlikes(false);
    }
  }, [post.likes, currentUser]);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${Backend_Url}/api/posts/${post._id}/like`,
        {}, // empty body
        { withCredentials: true } // include cookies if using cookie-based auth
      );

      setlikes(res.data.liked);
      setLikeCount(res.data.totalLikes);
      setLikedBy(res.data.likedBy);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full max-w-md rounded-xl shadow-lg  bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-sm font-semibold text-gray-800">
            {post.username}
          </h1>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>

        {/* Media */}
        {post.mimetype.startsWith("image/") ? (
          <img
            src={mediaURL}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        ) : post.mimetype.startsWith("video/") ? (
          <video
            autoPlay
            loop
            muted
            controls
            className="w-full h-[400px] object-cover"
          >
            <source src={mediaURL} type={post.mimetype} />
          </video>
        ) : (
          <p className="text-center py-4">Unsupported file type</p>
        )}

        {/* Footer */}
        <div className="px-4 py-3">
          <button
            onClick={handleLike}
            className={`text-2xl ${likes ? "text-red-500" : "text-gray-500"}`}
          >
            ❤️
          </button>
          <p className="text-sm font-semibold mt-1 text-gray-800">
            {likeCount} Like{likeCount !== 1 && "s"}
          </p>

          <p className="text-sm mt-2">
            <span className="font-semibold">{post.username}</span>{" "}
            {post.title && <span>{post.title} - </span>}
            {post.desc}
          </p>

          <p
            className="text-xs text-gray-500 mt-1 cursor-pointer hover:underline"
            onClick={() => setShowLikesModal(true)}
          >
            Liked by{" "}
            {likedBy.length > 0
              ? likedBy
                  .slice(0, 6)
                  .map((user) => user.username)
                  .join(", ") + (likedBy.length > 6 ? "..." : "")
              : "No one yet"}
          </p>

          {showLikesModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl w-80 max-h-96 overflow-y-auto p-4 shadow-lg relative">
                <h2 className="text-lg font-bold mb-2">Liked by</h2>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => setShowLikesModal(false)}
                >
                  ✖
                </button>
                {likedBy.length > 0 ? (
                  likedBy.map((user) => (
                    <div
                      key={user._id}
                      className="p-2 border-b border-gray-200 text-sm text-gray-700"
                    >
                      {user.username}
                    </div>
                  ))
                ) : (
                  <p>No likes yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
