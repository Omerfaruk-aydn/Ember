import React from "react";
import { Image, Upload } from "lucide-react";

export function AssetsPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-surface-400">Assets</span>
        <button className="rounded p-1 text-surface-400 hover:bg-white/10 hover:text-white">
          <Upload className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Image className="h-8 w-8 text-surface-600" />
        <p className="mt-2 text-xs text-surface-500">No assets uploaded</p>
        <p className="text-xs text-surface-600">Drag & drop or click to upload</p>
      </div>
    </div>
  )
}
