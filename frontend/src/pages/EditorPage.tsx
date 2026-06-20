import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useEditorStore } from "@/stores/editorStore"
import { projectsApi, scenesApi } from "@/lib/api/client"
import type { Project, Scene } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Pause, Plus } from "lucide-react"

export default function EditorPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const {
    project,
    scenes,
    selectedSceneId,
    currentTime,
    duration,
    isPlaying,
    setProject,
    setScenes,
    selectScene,
    togglePlay,
    setCurrentTime,
  } = useEditorStore()

  useEffect(() => {
    if (!projectId) return
    const load = async () => {
      try {
        const [projRes, scenesRes] = await Promise.all([
          projectsApi.get(projectId),
          scenesApi.list(projectId),
        ])
        setProject(projRes.data as Project)
        setScenes(scenesRes.data as Scene[])
      } catch {
        console.error("Failed to load project")
      }
    }
    load()
  }, [projectId, setProject, setScenes])

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex h-screen flex-col bg-dark-bg text-dark-text">
      <div className="flex items-center justify-between border-b border-dark-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Link to="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-sm font-medium">{project?.name || "Loading..."}</h1>
            {project && (
              <Badge variant="secondary" className="text-xs">
                {project.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-64 flex-col border-r border-dark-border bg-dark-card">
          <div className="flex items-center justify-between border-b border-dark-border px-4 py-3">
            <span className="text-sm font-medium">Scenes</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => selectScene(scene.id)}
                className={`mb-2 w-full rounded-lg p-3 text-left text-sm transition-colors ${
                  selectedSceneId === scene.id
                    ? "bg-brand-600/20 ring-1 ring-brand-500"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="font-medium">{scene.title || `Scene ${scene.order_index + 1}`}</div>
                <div className="mt-1 text-xs text-surface-500">
                  {formatTime(scene.duration_ms)}
                </div>
              </button>
            ))}
            {scenes.length === 0 && (
              <div className="py-8 text-center text-sm text-surface-500">
                No scenes yet. Generate a video to add scenes.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center bg-dark-bg">
            <div className="text-center text-surface-500">
              <div className="text-6xl">🎬</div>
              <p className="mt-4">Video Preview</p>
              <p className="text-xs">Select a scene or generate a video</p>
            </div>
          </div>

          <div className="border-t border-dark-border bg-dark-card">
            <div className="flex items-center gap-3 px-4 py-2">
              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <span className="min-w-[80px] text-xs tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-72 border-l border-dark-border bg-dark-card">
          <div className="flex items-center border-b border-dark-border px-4 py-3">
            <span className="text-sm font-medium">Properties</span>
          </div>
          <div className="p-4 text-sm text-surface-500">
            {selectedSceneId
              ? "Select a scene element to edit properties"
              : "No scene selected"}
          </div>
        </div>
      </div>
    </div>
  )
}
