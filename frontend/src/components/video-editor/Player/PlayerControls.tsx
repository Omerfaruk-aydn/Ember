import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export function PlayerControls() {
  const { isPlaying, togglePlay, currentTime, duration, setCurrentTime } = useEditorStore()

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    return `${m}:${(s % 60).toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-3 border-t border-dark-border bg-dark-card px-4 py-2">
      <button
        onClick={() => setCurrentTime(Math.max(0, currentTime - 5000))}
        className="rounded p-1 text-surface-400 hover:bg-white/10 hover:text-white"
      >
        <SkipBack className="h-4 w-4" />
      </button>

      <button
        onClick={togglePlay}
        className="rounded-full bg-brand-600 p-2 text-white hover:bg-brand-700"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <button
        onClick={() => setCurrentTime(Math.min(duration, currentTime + 5000))}
        className="rounded p-1 text-surface-400 hover:bg-white/10 hover:text-white"
      >
        <SkipForward className="h-4 w-4" />
      </button>

      <div className="flex flex-1 items-center gap-2">
        <span className="min-w-[50px] text-xs tabular-nums text-surface-400">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="flex-1 accent-brand-500"
        />
        <span className="min-w-[50px] text-right text-xs tabular-nums text-surface-400">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}
