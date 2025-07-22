// PostCard.js
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../Context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Analytics from "../Pages/Analytics";
import "swiper/css";
import "swiper/css/navigation";
import { sendAnalytics } from "../Utils/analytics";
import { usePostAnalytics } from "../../Hooks/usePostAnalytics";

function PostCard({ post, userId, HandleDeletePost, activeTab }) {
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;
  const { currentUser } = useAuth();
  const ref = useRef();
  const videoRefs = useRef([]);

  const [videoStates, setVideoStates] = useState({});

  const [likedBy, setLikedBy] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);

  usePostAnalytics({
    ref,
    postId: post._id,
    postOwnerId: post.user,
    currentUser,
    Backend_Url,
  });

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
      setLikes(res.data.liked);
      setLikeCount(res.data.totalLikes);
      setLikedBy(res.data.likedBy);
    } catch (err) {}
  };

  useEffect(() => {
    const observers = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play();
            video.muted = false;
            setVideoStates((prev) => ({
              ...prev,
              [index]: {
                ...prev[index],
                isPlaying: true,
                isMuted: false,
              },
            }));
          } else {
            video.pause();
            video.muted = true;
            setVideoStates((prev) => ({
              ...prev,
              [index]: {
                ...prev[index],
                isPlaying: false,
                isMuted: true,
              },
            }));
          }
        },
        {
          threshold: 0.5, // Adjust this as needed
        }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer, i) => {
        const video = videoRefs.current[i];
        if (video) observer.unobserve(video);
      });
    };
  }, [post.files]);

  return (
    <div className="w-full flex justify-center px-4 py-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        {/* Header Section */}
        <div
          ref={ref}
          className="flex items-center justify-between px-5 py-4 border-b border-gray-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {post.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                {post.username}
              </h1>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-xs font-medium">{post.views || 0} Views</span>
          </div>
        </div>

        {/* Media Carousel */}
        <div className="relative bg-black">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation]}
            className="w-full"
          >
            <div className="custom-prev absolute left-3 top-1/2 transform -translate-y-1/2 z-50 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-110">
              <span className="text-lg font-bold">‹</span>
            </div>
            <div className="custom-next absolute right-3 top-1/2 transform -translate-y-1/2 z-50 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 hover:scale-110">
              <span className="text-lg font-bold">›</span>
            </div>

            {post.files.map((file, index) => {
              const mediaURL = file.path.startsWith("http")
                ? file.path
                : `${Backend_Url}/${file.path}`;

              return (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    {file.mimetype.startsWith("image/") ? (
                      <img
                        src={mediaURL}
                        alt={`media-${index}`}
                        className="w-full h-auto block"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ) : file.mimetype.startsWith("video/") ? (
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        autoPlay={false}
                        muted={videoStates[index]?.isMuted ?? true}
                        className="w-full h-auto block cursor-pointer"
                        playsInline
                        preload="metadata"
                        onClick={() => {
                          const video = videoRefs.current[index];
                          if (!video) return;
                          if (video.paused) {
                            video.play();
                            video.muted = false;
                            setVideoStates((prevStates) => ({
                              ...prevStates,
                              [index]: { isPlaying: true, isMuted: false },
                            }));
                          } else {
                            video.pause();
                            video.muted = true;
                            setVideoStates((prevStates) => ({
                              ...prevStates,
                              [index]: { isPlaying: false, isMuted: true },
                            }));
                          }
                        }}
                      >
                        <source src={mediaURL} type={file.mimetype} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="flex items-center justify-center h-48 w-full">
                        <p className="text-gray-400">Unsupported media type</p>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Media Counter */}
          {post.files.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              1 / {post.files.length}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="px-5 py-4 space-y-3 ">
          {/* Like Button and Count */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-200 ${
                likes
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-red-400"
              }`}
            >
              <div className="text-2xl">
                {likes ? <FaHeart /> : <FaRegHeart />}
              </div>
            </button>
            <p className="text-sm font-semibold text-gray-800">
              {likeCount} {likeCount !== 1 ? "likes" : "like"}
            </p>
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-gray-800">
              <span className="font-semibold">{post.username}</span>{" "}
              {post.title && (
                <span className="font-medium">{post.title} - </span>
              )}
              {post.desc}
            </p>

            {/* Liked By Section */}
            <p
              className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-200"
              onClick={() => setShowLikesModal(true)}
            >
              Liked by{" "}
              {likedBy.length > 0
                ? likedBy
                    .slice(0, 3)
                    .map((user) => user.username)
                    .join(", ") +
                  (likedBy.length > 3
                    ? ` and ${likedBy.length - 3} others`
                    : "")
                : "no one yet"}
            </p>
          </div>

          {/* Delete Button */}
          {activeTab === "created" && (
            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={() => HandleDeletePost(post._id)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>

        {/* Likes Modal */}
        {showLikesModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm max-h-96 overflow-hidden shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Liked by</h2>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowLikesModal(false)}
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
              <div className="overflow-y-auto max-h-80">
                {likedBy.length > 0 ? (
                  likedBy.map((user, index) => (
                    <div
                      key={user._id}
                      className={`flex items-center space-x-3 px-6 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                        index !== likedBy.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.username}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No likes yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;