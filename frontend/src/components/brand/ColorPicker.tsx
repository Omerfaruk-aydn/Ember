import React, { useState } from "react";
import { validateHexColor } from "@/lib/validations";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [input, setInput] = useState("");

  const addColor = () => {
    if (validateHexColor(input) && !colors.includes(input)) {
      onChange([...colors, input])
      setInput("")
    }
  }

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="color"
          value={input || "#000000"}
          onChange={(e) => setInput(e.target.value)}
          className="h-9 w-9 cursor-pointer rounded border-0"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="#ff0000"
          className="flex-1 rounded border border-surface-300 px-2 py-1 text-sm"
          onKeyDown={(e) => e.key === "Enter" && addColor()}
        />
        <button onClick={addColor} className="rounded bg-brand-600 px-3 py-1 text-sm text-white">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: color }} />
            <span className="text-xs text-surface-500">{color}</span>
            <button onClick={() => removeColor(index)} className="text-xs text-red-400">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}
