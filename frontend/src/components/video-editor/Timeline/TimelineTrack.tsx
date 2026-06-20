import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { cn } from "@/lib/utils";

interface TimelineTrackProps {
  sceneId: string;
  label: string;
  color?: string;
}

export function TimelineTrack({ sceneId, label, color = "#6172f3" }: TimelineTrackProps) {
  const { selectedSceneId, selectScene, scenes } = useEditorStore()
  const scene = scenes.find((s) => s.id === sceneId)
  const isSelected = selectedSceneId === sceneId

  if (!scene) return null

  return (
    <div
      className={cn("timeline-track", isSelected && "selected")}
      style={{
        marginLeft: `${(scene.start_time_ms / 1000) * 15}px`,
        width: `${(scene.duration_ms / 1000) * 15}px`,
        backgroundColor: `${color}33`,
        borderLeft: `3px solid ${color}`,
      }}
      onClick={() => selectScene(sceneId)}
    >
      <div className="flex h-full items-center px-2">
        <span className="truncate text-xs text-surface-300">{label}</span>
      </div>
    </div>
  )
}
