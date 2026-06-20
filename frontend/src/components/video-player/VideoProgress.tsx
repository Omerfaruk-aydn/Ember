import React from "react";
import { Progress } from "@/components/ui/progress";

interface VideoProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function VideoProgress({ currentTime, duration, onSeek }: VideoProgressProps) {
  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="px-4 py-1">
      <Progress
        value={percentage}
        className="cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = x / rect.width
          onSeek(percentage * duration)
        }}
      />
    </div>
  )
}
