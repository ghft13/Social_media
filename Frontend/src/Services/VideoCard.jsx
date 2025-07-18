const VideoCard = ({ post }) => {
  const videoRef = useRef(null);
  const [watchStartTime, setWatchStartTime] = useState(null);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const isVideo = post?.files[0]?.includes(".mp4") || post?.type === "video"; // handle video

  useEffect(() => {
    if (!isVideo) {
      // For image views — track once per mount
      if (!hasTrackedView) {
        setHasTrackedView(true);
        axios.patch(`${Backend_URL}/api/posts/${post._id}/track`, { watchTime: 5 }, { withCredentials: true })
          .catch((err) => console.error("Error tracking image view", err));
      }
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!hasTrackedView) {
        setHasTrackedView(true);
        setWatchStartTime(Date.now());
      }
    };

    const handlePauseOrEnd = async () => {
      if (watchStartTime) {
        const duration = Math.floor((Date.now() - watchStartTime) / 1000);
        try {
          await axios.patch(`${Backend_URL}/api/posts/${post._id}/track`, { watchTime: duration }, { withCredentials: true });
        } catch (err) {
          console.error("Error tracking watch time", err);
        }
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePauseOrEnd);
    video.addEventListener("ended", handlePauseOrEnd);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePauseOrEnd);
      video.removeEventListener("ended", handlePauseOrEnd);
    };
  }, [watchStartTime, hasTrackedView, post._id, isVideo]);

  return (
    <div className="relative">
      {isVideo ? (
        <video
          ref={videoRef}
          src={post.files[0]}
          controls
          loop
          className="rounded-lg"
        />
      ) : (
        <img src={post.files[0]} alt="Post" className="rounded-lg" />
      )}
      <p className="absolute bottom-2 right-2 text-white bg-black px-2 py-1 rounded text-xs">
        Views: {post.views} | Watch Time: {Math.floor(post.watchTime / 60)} min
      </p>
    </div>
  );
};

export default VideoCard