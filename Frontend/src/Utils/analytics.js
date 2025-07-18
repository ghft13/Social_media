// utils/analytics.js or inside AuthContext
import axios from "axios";

export const sendAnalytics = async (Backend_Url, postId, watchTime) => {
  try {
    await axios.post(
      `${Backend_Url}/api/posts/analytics/${postId}`,
      { watchTime },
      { withCredentials: true }
    );
  } catch (err) {
    console.error("Analytics error:", err.message);
  }
};
