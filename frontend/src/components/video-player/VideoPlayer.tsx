import React from "react";

interface VideoPlayerProps {
  url: string;
  playing?: boolean;
  volume?: number;
  className?: string;
}

export function VideoPlayer({ url, playing = false, volume = 1, className }: VideoPlayerProps) {
  return (
    <div className={className}>
      <video
        src={url}
        controls
        autoPlay={playing}
        volume={volume}
        className="h-full w-full rounded-lg object-contain"
      />
    </div>
  )
}
