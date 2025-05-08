// components/VideoPlayer.tsx
import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-auto"
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;

