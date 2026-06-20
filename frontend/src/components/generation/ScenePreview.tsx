import React from "react";
import { cn } from "@/lib/utils";

interface ScenePreviewProps {
  scene: {
    id: string;
    title: string | null;
    image_url: string | null;
    duration_ms: number;
    status: string;
  };
  isSelected?: boolean;
  onClick?: () => void;
}

export function ScenePreview({ scene, isSelected, onClick }: ScenePreviewProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-lg border transition-all",
        isSelected ? "border-brand-500 ring-2 ring-brand-500/20" : "border-surface-200 hover:border-surface-300"
      )}
      onClick={onClick}
    >
      <div className="aspect-video bg-surface-100">
        {scene.image_url ? (
          <img src={scene.image_url} alt={scene.title || ""} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-surface-400">
            <span className="text-2xl">🎬</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="truncate text-xs font-medium">{scene.title || "Untitled"}</p>
        <p className="text-xs text-surface-500">{(scene.duration_ms / 1000).toFixed(1)}s</p>
      </div>
      <div className={cn(
        "absolute top-2 right-2 h-2 w-2 rounded-full",
        scene.status === "ready" ? "bg-green-500" : scene.status === "failed" ? "bg-red-500" : "bg-yellow-500"
      )} />
    </div>
  )
}
