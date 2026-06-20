import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { Plus, Trash2 } from "lucide-react";

export function ScenePanel() {
  const { scenes, selectedSceneId, selectScene } = useEditorStore()

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-surface-400">Scenes ({scenes.length})</span>
        <button className="rounded p-1 text-surface-400 hover:bg-white/10 hover:text-white">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      {scenes.map((scene) => (
        <div
          key={scene.id}
          className={`flex items-center justify-between rounded p-2 text-xs cursor-pointer ${
            selectedSceneId === scene.id ? "bg-brand-600/20 ring-1 ring-brand-500" : "hover:bg-white/5"
          }`}
          onClick={() => selectScene(scene.id)}
        >
          <div className="flex-1">
            <span className="text-surface-300">{scene.title || `Scene ${scene.order_index + 1}`}</span>
            <span className="ml-2 text-surface-600">{(scene.duration_ms / 1000).toFixed(1)}s</span>
          </div>
          <button className="rounded p-0.5 text-surface-500 hover:text-red-400">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
