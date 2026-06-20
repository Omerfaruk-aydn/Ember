import { useState, useCallback, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videosApi } from "@/lib/api/videos";
import { QUERY_KEYS } from "@/lib/constants";
import type { VideoGenerationInput, GenerationResult } from "@/types";

interface GenerationState {
  status: "idle" | "generating" | "rendering" | "complete" | "error";
  progress: number;
  phase: string;
  projectId: string | null;
  error: string | null;
  result: GenerationResult | null;
}

export function useVideoGeneration() {
  const [state, setState] = useState<GenerationState>({
    status: "idle",
    progress: 0,
    phase: "",
    projectId: null,
    error: null,
    result: null,
  });
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: (data: VideoGenerationInput) => videosApi.generate(data),
    onSuccess: (response) => {
      const data = response.data as { project_id: string };
      setState((prev) => ({
        ...prev,
        status: "generating",
        projectId: data.project_id,
        progress: 5,
        phase: "Initializing",
      }));
      startPolling(data.project_id);
    },
    onError: (error: Error) => {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: error.message || "Generation failed",
      }));
    },
  });

  const startPolling = useCallback((projectId: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const { data } = await videosApi.getStatus(projectId);
        const statusData = data as { status: string; progress: number; current_phase: string };

        setState((prev) => ({
          ...prev,
          progress: statusData.progress || prev.progress,
          phase: statusData.current_phase || prev.phase,
          status: statusData.status === "ready" ? "complete" : statusData.status === "failed" ? "error" : prev.status,
        }));

        if (statusData.status === "ready" || statusData.status === "failed") {
          stopPolling();
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects });
        }
      } catch {
        // Polling error - will retry
      }
    }, 2000);
  }, [queryClient]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const reset = useCallback(() => {
    stopPolling();
    setState({
      status: "idle",
      progress: 0,
      phase: "",
      projectId: null,
      error: null,
      result: null,
    });
  }, [stopPolling]);

  return {
    ...state,
    generate: generateMutation.mutate,
    isGenerating: state.status === "generating" || state.status === "rendering",
    reset,
  };
}
