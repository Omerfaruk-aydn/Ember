import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Film } from "lucide-react"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  generating: "default",
  ready: "default",
  failed: "destructive",
}

interface ProjectCardProps {
  id: string
  name: string
  status: string
  progress: number
  updatedAt: string
}

export function ProjectCard({ id, name, status, progress, updatedAt }: ProjectCardProps) {
  return (
    <a href={`/editor/${id}`} className="block">
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
              <Film className="h-5 w-5 text-brand-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{name}</h3>
                <Badge variant={statusColors[status] || "secondary"}>{status}</Badge>
              </div>
              <p className="mt-1 text-xs text-surface-500">{new Date(updatedAt).toLocaleDateString()}</p>
              {status === "generating" && (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-full bg-surface-100">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
