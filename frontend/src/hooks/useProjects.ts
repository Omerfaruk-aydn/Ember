import { useEffect, useCallback } from "react"
import { useProjectStore } from "@/stores/projectStore"
import { projectsApi } from "@/lib/api/client"
import type { ProjectList } from "@/types"

export function useProjects() {
  const { projects, isLoading, fetchProjects, deleteProject } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return { projects, isLoading, refetch: fetchProjects, deleteProject }
}

export function useVideoGeneration() {
  const startGeneration = useCallback(async (data: { prompt: string; name: string; description?: string; style?: string; duration?: number; aspect_ratio?: string }) => {
    const { data: project } = await projectsApi.create({
      name: data.name || "Video Project",
      prompt: data.prompt,
      description: data.description,
    })

    const { data: result } = await import("@/lib/api/client").then((m) =>
      m.default.post("/api/v1/videos/generate", {
        name: data.name || "Video Project",
        prompt: data.prompt,
        settings: { style: data.style, duration: data.duration, aspect_ratio: data.aspect_ratio },
      })
    )

    return { projectId: project.id, result }
  }, [])

  return { startGeneration }
}
