import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { formatTime } from "@/lib/formatters";

export function PlayerTimeline() {
  const { currentTime, duration, setCurrentTime } = useEditorStore()

  return (
    <div className="flex items-center gap-2 px-2 py-1">
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
  )
}
