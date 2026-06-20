import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GenerationState {
  status: "idle" | "generating" | "rendering" | "complete" | "error";
  progress: number;
  currentPhase: string;
  projectId: string | null;
  errors: string[];
  startTime: number | null;
  endTime: number | null;

  startGeneration: (projectId: string) => void;
  updateProgress: (progress: number, phase: string) => void;
  completeGeneration: () => void;
  setError: (error: string) => void;
  reset: () => void;
}

export const useGenerationStore = create<GenerationState>()(
  devtools(
    (set) => ({
      status: "idle",
      progress: 0,
      currentPhase: "",
      projectId: null,
      errors: [],
      startTime: null,
      endTime: null,

      startGeneration: (projectId) =>
        set({
          status: "generating",
          progress: 0,
          currentPhase: "Initializing",
          projectId,
          errors: [],
          startTime: Date.now(),
          endTime: null,
        }),

      updateProgress: (progress, currentPhase) =>
        set({ progress, currentPhase }),

      completeGeneration: () =>
        set({
          status: "complete",
          progress: 100,
          currentPhase: "Complete",
          endTime: Date.now(),
        }),

      setError: (error) =>
        set((state) => ({
          status: "error",
          errors: [...state.errors, error],
        })),

      reset: () =>
        set({
          status: "idle",
          progress: 0,
          currentPhase: "",
          projectId: null,
          errors: [],
          startTime: null,
          endTime: null,
        }),
    })
  )
);
