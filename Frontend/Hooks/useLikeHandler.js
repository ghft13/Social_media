import { useState, useEffect } from "react";
import axios from "axios";

export const useLikeHandler = ({ post, currentUser, Backend_Url }) => {
  const [likedBy, setLikedBy] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    if (post.likes && post.likes.length > 0) {
      const isPopulated = typeof post.likes[0] === "object" && post.likes[0]?.username;
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

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `${Backend_Url}/api/posts/${postId}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.liked);
      setLikeCount(res.data.totalLikes);
      setLikedBy(res.data.likedBy);
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  return {
    likedBy,
    likeCount,
    likes,
    handleLike,
  };
};
