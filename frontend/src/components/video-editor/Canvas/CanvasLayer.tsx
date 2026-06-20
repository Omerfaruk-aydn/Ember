import React from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/editorStore";

interface CanvasLayerProps {
  children: React.ReactNode;
  className?: string;
}

export function CanvasLayer({ children, className }: CanvasLayerProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {children}
    </div>
  )
}
