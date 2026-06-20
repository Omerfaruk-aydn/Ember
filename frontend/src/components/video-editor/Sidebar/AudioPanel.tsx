import React from "react";
import { Volume2, Music } from "lucide-react";

export function AudioPanel() {
  return (
    <div className="space-y-3">
      <span className="text-xs font-medium text-surface-400">Audio</span>
      <div className="rounded border border-dark-border p-3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-surface-400" />
          <div className="flex-1">
            <p className="text-xs text-surface-300">Voiceover</p>
            <p className="text-xs text-surface-600">No voiceover configured</p>
          </div>
        </div>
      </div>
      <div className="rounded border border-dark-border p-3">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-surface-400" />
          <div className="flex-1">
            <p className="text-xs text-surface-300">Background Music</p>
            <p className="text-xs text-surface-600">No music selected</p>
          </div>
        </div>
        <div className="mt-2">
          <label className="text-xs text-surface-500">Volume</label>
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.3" className="mt-1 w-full accent-brand-500" />
        </div>
      </div>
    </div>
  )
}
