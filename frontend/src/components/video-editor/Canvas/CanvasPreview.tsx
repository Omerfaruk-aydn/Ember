import React from "react";
import { useEditorStore } from "@/stores/editorStore";

export function CanvasPreview() {
  const { scenes, selectedSceneId, currentTime } = useEditorStore()
  const selectedScene = scenes.find((s) => s.id === selectedSceneId)

  return (
    <div className="canvas-preview" style={{ width: "100%", height: "100%" }}>
      {selectedScene?.image_url ? (
        <img
          src={selectedScene.image_url}
          alt={selectedScene.title || "Scene"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-surface-500">
            <div className="text-4xl">🎬</div>
            <p className="mt-2 text-sm">Video Canvas</p>
            <p className="text-xs text-surface-600">Select a scene to preview</p>
          </div>
        </div>
      )}
    </div>
  )
}
