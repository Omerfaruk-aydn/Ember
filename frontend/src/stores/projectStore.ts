import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { ProjectList } from "@/types"
import { projectsApi } from "@/lib/api/client"

interface ProjectState {
  projects: ProjectList[]
  isLoading: boolean
  error: string | null
  fetchProjects: () => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set) => ({
      projects: [],
      isLoading: false,
      error: null,

      fetchProjects: async () => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await projectsApi.list()
          set({ projects: data as unknown as ProjectList[], isLoading: false })
        } catch (error) {
          set({ error: "Failed to fetch projects", isLoading: false })
        }
      },

      deleteProject: async (id) => {
        try {
          await projectsApi.delete(id)
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          }))
        } catch (error) {
          set({ error: "Failed to delete project" })
        }
      },
    })
  )
)
