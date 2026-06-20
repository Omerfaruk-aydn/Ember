import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProjectStore } from "@/stores/projectStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Film, Trash2 } from "lucide-react"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  generating: "default",
  rendering: "default",
  ready: "default",
  failed: "destructive",
  archived: "outline",
}

export default function ProjectsPage() {
  const { projects, isLoading, fetchProjects, deleteProject } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-surface-500">All your video projects</p>
        </div>
        <Link to="/projects/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border border-surface-200 bg-white p-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center">
          <Film className="mx-auto h-12 w-12 text-surface-300" />
          <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
          <p className="mt-1 text-sm text-surface-500">Create your first video project to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-lg border border-surface-200 bg-white p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <Film className="h-5 w-5 text-brand-600" />
              </div>
              <div className="flex-1">
                <Link
                  to={`/editor/${project.id}`}
                  className="font-medium hover:text-brand-600 hover:underline"
                >
                  {project.name}
                </Link>
                <div className="flex items-center gap-2 text-sm text-surface-500">
                  <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                  <Badge variant={statusColors[project.status] || "secondary"} className="text-xs">
                    {project.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  deleteProject(project.id)
                }}
              >
                <Trash2 className="h-4 w-4 text-surface-400" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
