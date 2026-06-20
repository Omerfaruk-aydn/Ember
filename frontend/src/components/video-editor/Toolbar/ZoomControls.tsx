import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ZoomControls() {
  const { zoom, setZoom } = useEditorStore()

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <span className="min-w-[40px] text-center text-xs text-surface-400">{Math.round(zoom * 100)}%</span>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(Math.min(4, zoom + 0.25))}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setZoom(1)}>
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
