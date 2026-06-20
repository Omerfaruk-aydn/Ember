import type { Scene, MotionType } from "./video";

export interface EditorState {
  project: Project | null;
  scenes: Scene[];
  selectedSceneId: string | null;
  selectedElementId: string | null;
  multiSelectIds: string[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  fps: number;
  zoom: number;
  panX: number;
  panY: number;
  canvasWidth: number;
  canvasHeight: number;
  undoStack: EditorAction[];
  redoStack: EditorAction[];
  maxHistorySize: number;
  cursors: Map<string, CollaboratorCursor>;
  collaborators: Collaborator[];
  activePanel: "scenes" | "assets" | "effects" | "audio" | "brand";
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  isGenerating: boolean;
  generationProgress: number;
  currentPhase: string;
}

export interface EditorAction {
  type: string;
  timestamp: number;
  payload: Record<string, unknown>;
  undo: () => void;
  redo: () => void;
}

export interface Collaborator {
  user_id: string;
  name: string;
  avatar_url: string | null;
  color: string;
  selected_scene: string | null;
  last_active: string;
}

export interface CollaboratorCursor {
  x: number;
  y: number;
  selected_scene: string | null;
  timestamp: string;
}

export interface Layer {
  id: string;
  type: "text" | "image" | "shape" | "video";
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  data: Record<string, unknown>;
}

export import type { Project } from "./project";
