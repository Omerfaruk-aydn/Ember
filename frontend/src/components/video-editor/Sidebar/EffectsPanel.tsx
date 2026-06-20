import React from "react";
import { useEditorStore } from "@/stores/editorStore";

const EFFECT_TYPES = [
  { value: "blur", label: "Blur" },
  { value: "brightness", label: "Brightness" },
  { value: "contrast", label: "Contrast" },
  { value: "saturate", label: "Saturate" },
  { value: "grayscale", label: "Grayscale" },
  { value: "sepia", label: "Sepia" },
  { value: "hue-rotate", label: "Hue Rotate" },
]

export function EffectsPanel() {
  const { scenes, selectedSceneId, updateScene } = useEditorStore()
  const scene = scenes.find((s) => s.id === selectedSceneId)

  if (!scene) {
    return <p className="text-xs text-surface-500">Select a scene to edit effects</p>
  }

  return (
    <div className="space-y-3">
      <span className="text-xs font-medium text-surface-400">Effects</span>
      {scene.effects.map((effect, index) => (
        <div key={index} className="rounded border border-dark-border p-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-300 capitalize">{effect.type}</span>
            <button
              className="text-xs text-red-400 hover:text-red-300"
              onClick={() => {
                const newEffects = scene.effects.filter((_, i) => i !== index)
                updateScene(scene.id, { effects: newEffects })
              }}
            >
              Remove
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={effect.intensity}
            onChange={(e) => {
              const newEffects = [...scene.effects]
              newEffects[index] = { ...effect, intensity: parseFloat(e.target.value) }
              updateScene(scene.id, { effects: newEffects })
            }}
            className="mt-1 w-full accent-brand-500"
          />
        </div>
      ))}
      <select
        className="w-full rounded bg-dark-bg px-2 py-1.5 text-xs text-surface-300"
        onChange={(e) => {
          if (e.target.value) {
            const newEffects = [...scene.effects, { type: e.target.value as any, intensity: 0.5 }]
            updateScene(scene.id, { effects: newEffects })
            e.target.value = ""
          }
        }}
      >
        <option value="">Add effect...</option>
        {EFFECT_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
    </div>
  )
}
