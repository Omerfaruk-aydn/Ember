import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProjectStore } from "@/stores/projectStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Film } from "lucide-react"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  generating: "default",
  rendering: "default",
  ready: "default",
  failed: "destructive",
  archived: "outline",
}

export default function DashboardPage() {
  const { projects, isLoading, fetchProjects } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-surface-500">Manage your video projects</p>
        </div>
        <Link to="/projects/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <Film className="mx-auto h-12 w-12 text-surface-300" />
            <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
            <p className="mt-1 text-sm text-surface-500">Create your first video project to get started.</p>
            <Link to="/projects/new">
              <Button className="mt-4">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} to={`/editor/${project.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={statusColors[project.status] || "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(project.updated_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {project.description && (
                    <p className="line-clamp-2 text-sm text-surface-600">{project.description}</p>
                  )}
                  {project.status === "generating" && (
                    <div className="mt-3">
                      <div className="mb-1 flex justify-between text-xs text-surface-500">
                        <span>Progress</span>
                        <span>{Math.round(project.progress)}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-100">
                        <div
                          className="h-full rounded-full bg-brand-500 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
