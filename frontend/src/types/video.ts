export interface Scene {
  id: string;
  project_id: string;
  order_index: number;
  start_time_ms: number;
  duration_ms: number;
  title: string | null;
  description: string | null;
  voiceover_text: string | null;
  image_prompt: string | null;
  image_url: string | null;
  image_seed: number | null;
  image_model: string | null;
  motion_type: MotionType;
  animation_duration_ms: number;
  animation_easing: string;
  voiceover_url: string | null;
  voiceover_duration_ms: number | null;
  voiceover_voice_id: string | null;
  background_music_volume: number;
  effects: Effect[];
  text_overlays: TextOverlay[];
  transition_in: string;
  transition_out: string;
  transition_duration_ms: number;
  status: SceneStatus;
  quality_score: number | null;
  quality_feedback: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export type MotionType =
  | "fade"
  | "slide_left"
  | "slide_right"
  | "slide_up"
  | "slide_down"
  | "zoom_in"
  | "zoom_out"
  | "rotate"
  | "parallax"
  | "kinetic"
  | "kinetic_bold";

export type SceneStatus =
  | "pending"
  | "generating_image"
  | "generating_audio"
  | "composing"
  | "rendering"
  | "ready"
  | "failed";

export interface Effect {
  type: "blur" | "brightness" | "contrast" | "saturate" | "grayscale" | "sepia" | "hue-rotate" | "glow";
  intensity: number;
  color?: string;
}

export interface TextOverlay {
  text: string;
  position: { x: number; y: number };
  style: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
    borderRadius?: number;
  };
  animation: "none" | "typewriter" | "fade_in" | "slide_in" | "scale_up";
  start_ms: number;
  duration_ms: number;
}

export interface VideoSettings {
  showWatermark: boolean;
  captionStyle: {
    fontSize: number;
    fontFamily: string;
    color: string;
    backgroundColor: string;
    position: "bottom" | "top";
  };
  textOverlays: Array<{
    text: string;
    style: Record<string, unknown>;
    animation: string;
    startFrame: number;
    durationFrames: number;
  }>;
}

export interface GenerationResult {
  project_id: string;
  scenes: Scene[];
  images: Array<{ scene_id: string; image_url: string; status: string }>;
  status: string;
}

export interface VideoGenerationInput {
  prompt: string;
  name?: string;
  description?: string;
  duration?: number;
  style?: string;
  aspect_ratio?: string;
  brand_id?: string;
  quality?: string;
}
