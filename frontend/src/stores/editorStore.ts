import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Project, Scene } from "@/types"

interface EditorState {
  project: Project | null
  scenes: Scene[]
  selectedSceneId: string | null
  currentTime: number
  duration: number
  isPlaying: boolean
  playbackRate: number
  zoom: number
  activePanel: "scenes" | "assets" | "effects" | "audio" | "brand"
  isGenerating: boolean
  generationProgress: number
  currentPhase: string

  setProject: (project: Project) => void
  setScenes: (scenes: Scene[]) => void
  selectScene: (id: string | null) => void
  setCurrentTime: (time: number) => void
  togglePlay: () => void
  setPlaybackRate: (rate: number) => void
  setZoom: (zoom: number) => void
  setActivePanel: (panel: EditorState["activePanel"]) => void
  startGeneration: () => void
  updateProgress: (progress: number, phase: string) => void
  completeGeneration: () => void
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set) => ({
      project: null,
      scenes: [],
      selectedSceneId: null,
      currentTime: 0,
      duration: 30000,
      isPlaying: false,
      playbackRate: 1,
      zoom: 1,
      activePanel: "scenes",
      isGenerating: false,
      generationProgress: 0,
      currentPhase: "",

      setProject: (project) => set({ project, duration: project.duration_seconds * 1000 }),
      setScenes: (scenes) => set({ scenes }),
      selectScene: (id) => set({ selectedSceneId: id }),
      setCurrentTime: (time) => set({ currentTime: Math.max(0, time) }),
      togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
      setActivePanel: (panel) => set({ activePanel: panel }),
      startGeneration: () => set({ isGenerating: true, generationProgress: 0, currentPhase: "Initializing" }),
      updateProgress: (progress, phase) => set({ generationProgress: progress, currentPhase: phase }),
      completeGeneration: () => set({ isGenerating: false, generationProgress: 100, currentPhase: "Complete" }),
    })
  )
)
