import React from "react";
import { cn } from "@/lib/utils";
import { VIDEO_STYLES } from "@/lib/constants";

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {VIDEO_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onChange(style.id)}
          className={cn(
            "rounded-lg border p-3 text-left transition-all",
            value === style.id
              ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
              : "border-surface-200 hover:border-surface-300"
          )}
        >
          <p className="text-sm font-medium">{style.name}</p>
          <p className="text-xs text-surface-500">{style.description}</p>
        </button>
      ))}
    </div>
  )
}
