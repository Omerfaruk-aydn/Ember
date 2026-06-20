import React from "react";
import { useEditorStore } from "@/stores/editorStore";

export function TimelineCursor() {
  const { currentTime } = useEditorStore()
  const pixelsPerMs = 0.15

  return (
    <div
      className="timeline-cursor"
      style={{ left: `${currentTime * pixelsPerMs}px` }}
    />
  )
}
