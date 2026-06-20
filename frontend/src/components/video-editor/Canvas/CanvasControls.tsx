import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { ZoomIn, ZoomOut, Maximize2, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CanvasControls() {
  const { zoom, setZoom, showGrid } = useEditorStore()

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-dark-card/80 px-2 py-1">
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}>
        <ZoomOut className="h-3 w-3" />
      </Button>
      <span className="min-w-[40px] text-center text-xs text-surface-400">{Math.round(zoom * 100)}%</span>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom(Math.min(4, zoom + 0.25))}>
        <ZoomIn className="h-3 w-3" />
      </Button>
      <div className="mx-1 h-4 w-px bg-dark-border" />
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom(1)}>
        <Maximize2 className="h-3 w-3" />
      </Button>
      <Button variant={showGrid ? "secondary" : "ghost"} size="icon" className="h-6 w-6">
        <Grid3X3 className="h-3 w-3" />
      </Button>
    </div>
  )
}
