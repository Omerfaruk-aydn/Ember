import React from "react";
import { useEditorStore } from "@/stores/editorStore";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TimelineControls() {
  const { isPlaying, togglePlay, setCurrentTime, currentTime, duration } = useEditorStore()

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setCurrentTime(0)}>
        <SkipBack className="h-3 w-3" />
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={togglePlay}>
        {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setCurrentTime(duration)}>
        <SkipForward className="h-3 w-3" />
      </Button>
    </div>
  )
}
