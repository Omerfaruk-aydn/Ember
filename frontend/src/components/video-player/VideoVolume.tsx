import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoVolumeProps {
  volume: number;
  onChange: (volume: number) => void;
}

export function VideoVolume({ volume, onChange }: VideoVolumeProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(volume > 0 ? 0 : 1)}>
        {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-20 accent-brand-500"
      />
    </div>
  )
}
