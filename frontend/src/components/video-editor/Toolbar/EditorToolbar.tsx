import React from "react";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Grid3X3,
  Ruler,
} from "lucide-react";
import { useEditorStore } from "@/stores/editorStore";

export function EditorToolbar() {
  const { zoom, setZoom, project } = useEditorStore()

  return (
    <div className="flex items-center justify-between border-b border-dark-border bg-dark-card px-4 py-2">
      <div className="flex items-center gap-1">
        <button className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white" title="Undo">
          <Undo2 className="h-4 w-4" />
        </button>
        <button className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white" title="Redo">
          <Redo2 className="h-4 w-4" />
        </button>

        <div className="mx-2 h-4 w-px bg-dark-border" />

        <button
          onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
          className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="min-w-[40px] text-center text-xs text-surface-400">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(4, zoom + 0.25))}
          className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white"
          title="Fit to Screen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-surface-300">
          {project?.name || "Untitled"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white" title="Grid">
          <Grid3X3 className="h-4 w-4" />
        </button>
        <button className="rounded p-1.5 text-surface-400 hover:bg-white/10 hover:text-white" title="Rulers">
          <Ruler className="h-4 w-4" />
        </button>

        <div className="mx-2 h-4 w-px bg-dark-border" />

        <button className="flex items-center gap-1.5 rounded bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">
          <Download className="h-3.5 w-3.5" />
          Export
        </button>
      </div>
    </div>
  )
}
