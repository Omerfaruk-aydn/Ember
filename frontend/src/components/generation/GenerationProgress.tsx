import { motion } from "framer-motion"

const phaseLabels: Record<string, string> = {
  init: "Initializing",
  research: "Researching",
  storyboard: "Creating Storyboard",
  visual: "Generating Visuals",
  audio: "Generating Audio",
  composition: "Composing Video",
  rendering: "Rendering",
  complete: "Complete",
}

interface GenerationProgressProps {
  progress: number
  phase: string
}

export function GenerationProgress({ progress, phase }: GenerationProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{phaseLabels[phase] || phase}</span>
        <span className="text-surface-500">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-100">
        <motion.div
          className="h-full rounded-full bg-brand-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <motion.div
            className="h-2 w-2 rounded-full bg-brand-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          Processing...
        </div>
      </div>
    </div>
  )
}
