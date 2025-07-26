import { useEffect, useState, useRef } from "react";

export const useVideoAutoPlay = (files) => {
  const videoRefs = useRef([]);
  const [videoStates, setVideoStates] = useState({});

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
              [index]: { isPlaying: true, isMuted: false },
            }));
          } else {
            video.pause();
            video.muted = true;
            setVideoStates((prev) => ({
              ...prev,
              [index]: { isPlaying: false, isMuted: true },
            }));
          }
        },
        { threshold: 0.5 }
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
  }, [files]);

  return { videoRefs, videoStates, setVideoStates };
};
