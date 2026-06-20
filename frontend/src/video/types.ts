export interface SceneData {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_prompt: string;
  duration_ms: number;
  motion_type: "fade" | "slide_left" | "slide_right" | "slide_up" | "slide_down" | "zoom_in" | "zoom_out" | "kinetic" | "parallax";
  animation_duration_ms: number;
  animation_easing: string;
  effects: Effect[];
  text_overlays: TextOverlay[];
  transition_in: string;
  transition_out: string;
  transition_duration_ms: number;
  voiceover_text: string | null;
  voiceover_url: string | null;
}

export interface Effect {
  type: "blur" | "brightness" | "contrast" | "saturate" | "grayscale" | "sepia" | "hue-rotate";
  intensity: number;
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

export interface AudioData {
  url: string;
  volume: number;
}

export interface CaptionData {
  text: string;
  start_ms: number;
  end_ms: number;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
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
