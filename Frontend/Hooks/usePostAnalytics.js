import { useEffect, useRef } from "react";
import axios from "axios";

export const usePostAnalytics = ({
  ref,
  postId,
  postOwnerId,
  currentUser,
  Backend_Url,
}) => {
  // we need our own ref for hasViewed so re‑renders don’t reset it
  const hasViewedRef = useRef(false);

  useEffect(() => {
    // 1️⃣ Bail if not logged in or if it's your own post
    if (
      !currentUser?.userId ||
      currentUser.userId === postOwnerId
    ) {
      return;
    }

    let isVisible = false;
    let isDocumentVisible = !document.hidden;
    let startTs = null;

    const sendAnalytics = async (watchTime) => {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        // start once, when it first comes into view
        if (isVisible && isDocumentVisible && !hasViewedRef.current) {
          startTs = Date.now();
          hasViewedRef.current = true;
        }
        // stop when it leaves or tab hidden
        else if ((!isVisible || !isDocumentVisible) && startTs) {
          const secs = Math.floor((Date.now() - startTs) / 1000);
          if (secs > 0) sendAnalytics(secs);
          startTs = null;
        }
      },
      { threshold: 0.6 }
    );

    const handleVisibilityChange = () => {
      const wasVisible = isDocumentVisible;
      isDocumentVisible = !document.hidden;

      if (isVisible) {
        // tab back → restart
        if (!wasVisible && isDocumentVisible) {
          startTs = Date.now();
        }
        // tab hidden → send
        else if (wasVisible && !isDocumentVisible && startTs) {
          const secs = Math.floor((Date.now() - startTs) / 1000);
          if (secs > 0) sendAnalytics(secs);
          startTs = null;
        }
      }
    };

    // Fallback for some browsers
    const handleWindowFocus = () => {
      if (isVisible && !startTs) {
        startTs = Date.now();
      }
    };
    const handleWindowBlur = () => {
      if (startTs) {
        const secs = Math.floor((Date.now() - startTs) / 1000);
        if (secs > 0) sendAnalytics(secs);
        startTs = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    if (ref.current) observer.observe(ref.current);

    return () => {
      // final send on unmount
      if (startTs) {
        const secs = Math.floor((Date.now() - startTs) / 1000);
        if (secs > 0) sendAnalytics(secs);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, postId, postOwnerId, currentUser?.userId, Backend_Url]);
};
