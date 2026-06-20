export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  prompt: string;
  aspect_ratio: string;
  duration_seconds: number;
  status: ProjectStatus;
  brand_context_id: string | null;
  settings: ProjectSettings;
  quality: "draft" | "standard" | "high" | "ultra";
  output_format: string;
  output_fps: number;
  output_bitrate: string;
  progress: number;
  current_phase: string | null;
  error_message: string | null;
  generation_time_ms: number | null;
  render_time_ms: number | null;
  file_size_bytes: number | null;
  version: number;
  tags: string[];
  scenes?: Scene[];
  video_url?: string | null;
  thumbnail_url?: string | null;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus = "draft" | "generating" | "rendering" | "ready" | "failed" | "archived";

export interface ProjectSettings {
  style: string;
  mood: string;
  pacing: string;
  colorGrading: string;
  transitions: string;
  textAnimation: string;
  musicGenre: string;
  voiceType: string;
  voiceGender: string;
}

export interface ProjectCreateInput {
  name: string;
  prompt: string;
  description?: string;
  aspect_ratio?: string;
  duration_seconds?: number;
  quality?: string;
  settings?: Partial<ProjectSettings>;
  tags?: string[];
}

export interface ProjectUpdateInput {
  name?: string;
  description?: string;
  prompt?: string;
  aspect_ratio?: string;
  duration_seconds?: number;
  quality?: string;
  settings?: Partial<ProjectSettings>;
  tags?: string[];
}
