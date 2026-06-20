import React, { useRef, useCallback } from "react";
import { useEditorStore } from "@/stores/editorStore";
import type { Scene } from "@/types";

export function Timeline() {
  const { scenes, currentTime, duration, selectedSceneId, selectScene, setCurrentTime } = useEditorStore()
  const timelineRef = useRef<HTMLDivElement>(null)

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    return `${m}:${(s % 60).toString().padStart(2, "0")}`
  }

  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      setCurrentTime(Math.floor(percentage * duration))
    },
    [duration, setCurrentTime]
  )

  const pixelsPerMs = 0.15

  return (
    <div className="flex flex-col border-t border-dark-border bg-dark-card">
      <div className="flex items-center justify-between border-b border-dark-border px-4 py-2">
        <span className="text-xs font-medium text-surface-400">Timeline</span>
        <div className="flex items-center gap-2 text-xs text-surface-500">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex items-center border-b border-dark-border px-2 py-1">
          {Array.from({ length: Math.ceil(duration / 5000) + 1 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 text-xs text-surface-600" style={{ width: 5000 * pixelsPerMs }}>
              {formatTime(i * 5000)}
            </div>
          ))}
        </div>

        <div
          ref={timelineRef}
          className="relative h-16 cursor-pointer"
          onClick={handleTimelineClick}
        >
          {scenes.map((scene: Scene) => {
            const left = scene.start_time_ms * pixelsPerMs
            const width = scene.duration_ms * pixelsPerMs
            const isSelected = selectedSceneId === scene.id

            return (
              <div
                key={scene.id}
                className={`absolute top-1 h-14 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-brand-500 bg-brand-600/20"
                    : "border-dark-border bg-white/5 hover:bg-white/10"
                }`}
                style={{ left, width }}
                onClick={(e) => {
                  e.stopPropagation()
                  selectScene(scene.id)
                }}
              >
                <div className="flex h-full items-center justify-center px-2">
                  <span className="truncate text-xs text-surface-300">
                    {scene.title || `Scene ${scene.order_index + 1}`}
                  </span>
                </div>
              </div>
            )
          })}

          <div
            className="absolute top-0 h-full w-0.5 bg-brand-500"
            style={{ left: currentTime * pixelsPerMs }}
          >
            <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
