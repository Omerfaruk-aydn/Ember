import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { Layers, Image, Sparkles, Volume2, Palette, Plus, Trash2 } from "lucide-react";

const panels = [
  { id: "scenes" as const, label: "Scenes", icon: Layers },
  { id: "assets" as const, label: "Assets", icon: Image },
  { id: "effects" as const, label: "Effects", icon: Sparkles },
  { id: "audio" as const, label: "Audio", icon: Volume2 },
  { id: "brand" as const, label: "Brand", icon: Palette },
]

export function PropertiesPanel() {
  const { activePanel, setActivePanel, scenes, selectedSceneId } = useEditorStore()
  const selectedScene = scenes.find((s) => s.id === selectedSceneId)

  return (
    <div className="flex w-72 flex-col border-l border-dark-border bg-dark-card">
      <div className="flex border-b border-dark-border">
        {panels.map((panel) => {
          const Icon = panel.icon
          return (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                activePanel === panel.id
                  ? "border-b-2 border-brand-500 text-brand-400"
                  : "text-surface-500 hover:text-surface-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              {panel.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activePanel === "scenes" && (
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
                onClick={() => useEditorStore.getState().selectScene(scene.id)}
              >
                <span className="text-surface-300">{scene.title || `Scene ${scene.order_index + 1}`}</span>
                <button className="rounded p-0.5 text-surface-500 hover:text-red-400">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activePanel === "effects" && selectedScene && (
          <div className="space-y-3">
            <span className="text-xs font-medium text-surface-400">Effects</span>
            <div className="space-y-2">
              <div className="rounded border border-dark-border p-2">
                <label className="text-xs text-surface-500">Motion Type</label>
                <select
                  className="mt-1 w-full rounded bg-dark-bg px-2 py-1 text-xs text-surface-300"
                  value={selectedScene.motion_type}
                  onChange={(e) => {
                    useEditorStore.getState().updateScene(selectedScene.id, {
                      motion_type: e.target.value,
                    })
                  }}
                >
                  <option value="fade">Fade</option>
                  <option value="slide_left">Slide Left</option>
                  <option value="slide_right">Slide Right</option>
                  <option value="slide_up">Slide Up</option>
                  <option value="zoom_in">Zoom In</option>
                  <option value="zoom_out">Zoom Out</option>
                  <option value="kinetic">Kinetic</option>
                  <option value="parallax">Parallax</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activePanel === "audio" && (
          <div className="space-y-3">
            <span className="text-xs font-medium text-surface-400">Audio</span>
            <p className="text-xs text-surface-500">No audio configured</p>
          </div>
        )}

        {activePanel === "brand" && (
          <div className="space-y-3">
            <span className="text-xs font-medium text-surface-400">Brand Context</span>
            <p className="text-xs text-surface-500">No brand context applied</p>
          </div>
        )}

        {activePanel === "assets" && (
          <div className="space-y-3">
            <span className="text-xs font-medium text-surface-400">Assets</span>
            <p className="text-xs text-surface-500">No assets uploaded</p>
          </div>
        )}
      </div>
    </div>
  )
}
