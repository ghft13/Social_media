import PostCard from "../Components/PostCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const { user } = useParams();
  const [posts, setPosts] = useState([]);
  const [userdata, setuserdata] = useState({});
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function GetUserPost() {
      try {
        const response = await axios.get(`${Backend_Url}/api/user/${user}`);
        setPosts(response.data.posts);
        setuserdata(response.data.userDetails);
      } catch (err) {
        console.log("Error fetching user posts:", err);
      }
    }

    GetUserPost();
  }, [user]);

  const openModal = (index) => {
    setSelectedPostIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostIndex(null);
    document.body.style.overflow = "unset"; // Restore background scroll
  };

  const goToNext = () => {
    if (selectedPostIndex < posts.length - 1) {
      setSelectedPostIndex(selectedPostIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedPostIndex > 0) {
      setSelectedPostIndex(selectedPostIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, selectedPostIndex]);

  const handleWheel = (e) => {
    if (!isModalOpen) return;

    if (e.deltaY > 0) {
      goToNext(); // Scroll down - next post
    } else {
      goToPrevious(); // Scroll up - previous post
    }
  };

  return (
    <div className="py-4 max-w-6xl mx-auto">
      {userdata.username ? (
        <div className="text-center mb-6">
          {/* Profile Image Container - always present */}
          <div className="mb-4">
            {userdata.profileImage ? (
              <img
                src={
                  userdata.profileImage?.startsWith("http")
                    ? userdata.profileImage
                    : `${Backend_Url}/${userdata.profileImage}`
                }
                alt={`${userdata.username}'s profile`}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-bold">
                  {userdata.username?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          {/* Username */}
          <h2 className="text-2xl font-bold">Posts by {userdata.username}</h2>
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-center mb-6">
          Loading user info...
        </h2>
      )}

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, index) => {
            const mediaFile =
              post.files && post.files.length > 0 ? post.files[0] : null;
            const mediaUrl = mediaFile ? mediaFile.path : null;
            const isVideo =
              mediaFile &&
              mediaFile.mimetype &&
              mediaFile.mimetype.startsWith("video");

            return (
              <div
                key={post._id}
                className="aspect-square bg-gray-200 cursor-pointer relative group h-52"
                onClick={() => openModal(index)}
              >
                {mediaUrl ? (
                  isVideo ? (
                    <video
                      className="w-full h-full object-cover"
                      src={
                        mediaUrl.startsWith("http")
                          ? mediaUrl
                          : `${Backend_Url}/${mediaUrl}`
                      }
                    />
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      src={
                        mediaUrl.startsWith("http")
                          ? mediaUrl
                          : `${Backend_Url}/${mediaUrl}`
                      }
                      alt=""
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                    No media found
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedPostIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onWheel={handleWheel}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl z-60 hover:text-gray-300"
          >
            ✕
          </button>

          {/* Navigation arrows */}
          {selectedPostIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-60 hover:text-gray-300"
            >
              ‹
            </button>
          )}

          {selectedPostIndex < posts.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-60 hover:text-gray-300"
            >
              ›
            </button>
          )}

          {/* Post content */}
          <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-md w-full max-h-full overflow-y-auto">
              <PostCard
                key={posts[selectedPostIndex]._id}
                post={posts[selectedPostIndex]}
                userId={user}
                HandleDeletePost={() => {}}
                activeTab=""
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedPostIndex + 1} / {posts.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
