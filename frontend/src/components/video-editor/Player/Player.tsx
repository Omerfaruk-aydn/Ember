import React from "react";
import { useEditorStore } from "@/stores/editorStore";

export function Player() {
  const { scenes, selectedSceneId, currentTime } = useEditorStore()
  const scene = scenes.find((s) => s.id === selectedSceneId)

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-dark-bg">
      {scene?.image_url ? (
        <img src={scene.image_url} alt={scene.title || ""} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-surface-500">
            <div className="text-5xl">🎬</div>
            <p className="mt-3 text-sm">Video Preview</p>
          </div>
        </div>
      )}
    </div>
  )
}
