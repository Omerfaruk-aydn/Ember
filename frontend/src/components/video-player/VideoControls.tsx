import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoControlsProps {
  playing: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  onVolumeChange: (v: number) => void;
}

export function VideoControls({ playing, onTogglePlay, currentTime, duration, volume, onVolumeChange }: VideoControlsProps) {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-3 rounded-b-lg bg-dark-card px-4 py-2">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onTogglePlay}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <SkipForward className="h-4 w-4" />
      </Button>
      <span className="text-xs tabular-nums text-surface-400">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
      <div className="flex-1" />
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}>
        {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  )
}
