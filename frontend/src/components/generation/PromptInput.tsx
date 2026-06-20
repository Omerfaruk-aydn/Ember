import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const styles = ["cinematic", "modern", "playful", "minimal", "kinetic", "elegant"]
const durations = [15, 30, 60, 120]
const aspectRatios = ["16:9", "9:16", "1:1", "4:3"]

interface PromptInputProps {
  onSubmit: (data: { prompt: string; style: string; duration: number; aspect_ratio: string }) => void
  isLoading?: boolean
}

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("cinematic")
  const [duration, setDuration] = useState(30)
  const [aspectRatio, setAspectRatio] = useState("16:9")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="space-y-2">
        <Label>Video Prompt</Label>
        <Textarea
          placeholder="Describe the video you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Style</Label>
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                style === s ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <div className="flex gap-2">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                duration === d ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              )}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Aspect Ratio</Label>
        <div className="flex gap-2">
          {aspectRatios.map((r) => (
            <button
              key={r}
              onClick={() => setAspectRatio(r)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                aspectRatio === r ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        disabled={!prompt.trim() || isLoading}
        onClick={() => onSubmit({ prompt, style, duration, aspect_ratio: aspectRatio })}
      >
        {isLoading ? "Generating..." : "Generate Video"}
      </Button>
    </motion.div>
  )
}
