import React from "react";
import { useEditorStore } from "@/stores/editorStore";

export function Canvas() {
  const { zoom, setZoom } = useEditorStore()

  return (
    <div className="flex flex-1 items-center justify-center bg-dark-bg">
      <div
        className="relative overflow-hidden rounded-lg border border-dark-border bg-dark-card"
        style={{
          width: `${(1920 / 4) * zoom}px`,
          height: `${(1080 / 4) * zoom}px`,
          aspectRatio: "16/9",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-surface-500">
            <div className="text-4xl">🎬</div>
            <p className="mt-2 text-sm">Video Canvas</p>
            <p className="text-xs text-surface-600">
              Select a scene to preview
            </p>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-dark-card/80 px-2 py-1">
          <button
            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
            className="text-xs text-surface-400 hover:text-white"
          >
            −
          </button>
          <span className="min-w-[40px] text-center text-xs text-surface-400">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(Math.min(4, zoom + 0.25))}
            className="text-xs text-surface-400 hover:text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
