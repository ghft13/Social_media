import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../Context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function PostCard({ post, userId, HandleDeletePost, activeTab }) {
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;

  
  // ✅ Combine Cloudinary & local URL handling

  const { currentUser } = useAuth();
  const [isLiked, SetIsLiked] = useState(false);
  const [likedBy, setLikedBy] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showLikesModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showLikesModal]);

  useEffect(() => {
    if (post.likes && post.likes.length > 0) {
      const isPopulated =
        typeof post.likes[0] === "object" && post.likes[0]?.username;

      setLikedBy(post.likes);
      setLikeCount(post.likes.length);
      setLikes(
        isPopulated
          ? post.likes.some((user) => user._id === currentUser?.userId)
          : post.likes.includes(currentUser?.userId)
      );
    } else {
      setLikedBy([]);
      setLikeCount(0);
      setLikes(false);
    }
  }, [post.likes, currentUser]);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${Backend_Url}/api/posts/${post._id}/like`,
        {},
        { withCredentials: true }
      );
      SetIsLiked(true);

      setLikes(res.data.liked);
      setLikeCount(res.data.totalLikes);
      setLikedBy(res.data.likedBy);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full max-w-md rounded-xl shadow-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-sm font-semibold text-gray-800">
            {post.username}
          </h1>
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        {/* Carousel for multiple media files */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          className="w-full h-[400px] relative  "
        >
          <div className="custom-prev text-2xl   absolute left-2 top-1/2 transform -translate-y-1/2 z-50  text-black rounded-full p-2 shadow-lg cursor-pointer">
            ←
          </div>
          <div className="custom-next  text-2xl absolute right-2 top-1/2 transform -translate-y-1/2 z-50  text-black rounded-full p-2 shadow-lg cursor-pointer">
            →
          </div>

          {post.files.map((file, index) => {
            const mediaURL = file.path.startsWith("http")
              ? file.path
              : `${Backend_Url}/${file.path}`;

            return (
              <SwiperSlide key={index}>
                {file.mimetype.startsWith("image/") ? (
                  <img
                    src={mediaURL}
                    alt={`media-${index}`}
                    className="w-full h-[400px] object-cover"
                  />
                ) : file.mimetype.startsWith("video/") ? (
                  <video controls className="w-full h-[400px] object-cover">
                    <source src={mediaURL} type={file.mimetype}/>
                  </video>
                ) : (
                  <p>Unsupported</p>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Footer */}

        <div className="px-4 py-3">
          <button
            onClick={handleLike}
            className={`text-2xl ${likes ? "text-red-500" : "text-gray-500"}`}
          >
            {likes ? <FaHeart /> : <FaRegHeart />}
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

          <div className="flex justify-center items-center ">
            {activeTab === "created" && (
              <button
                onClick={() => HandleDeletePost(post._id)}
                className="mt-6 w-[50%] bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full flex items-center justify-center gap-2 shadow-md transition duration-300 ease-in-out "
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
