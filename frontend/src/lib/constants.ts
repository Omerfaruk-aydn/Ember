export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

export const QUERY_KEYS = {
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  scenes: (projectId: string) => ["projects", projectId, "scenes"] as const,
  scene: (projectId: string, sceneId: string) => ["projects", projectId, "scenes", sceneId] as const,
  brands: ["brands"] as const,
  brand: (id: string) => ["brands", id] as const,
  templates: ["templates"] as const,
  styles: ["styles"] as const,
  subscription: ["billing", "subscription"] as const,
  usage: ["billing", "usage"] as const,
  plans: ["billing", "plans"] as const,
  assets: ["assets"] as const,
  mcpTools: ["mcp", "tools"] as const,
  adminStats: ["admin", "dashboard", "stats"] as const,
} as const;

export const PROJECT_STATUSES = {
  draft: { label: "Draft", color: "secondary" },
  generating: { label: "Generating", color: "default" },
  rendering: { label: "Rendering", color: "default" },
  ready: { label: "Ready", color: "default" },
  failed: { label: "Failed", color: "destructive" },
  archived: { label: "Archived", color: "outline" },
} as const;

export const MOTION_TYPES: { value: string; label: string }[] = [
  { value: "fade", label: "Fade" },
  { value: "slide_left", label: "Slide Left" },
  { value: "slide_right", label: "Slide Right" },
  { value: "slide_up", label: "Slide Up" },
  { value: "slide_down", label: "Slide Down" },
  { value: "zoom_in", label: "Zoom In" },
  { value: "zoom_out", label: "Zoom Out" },
  { value: "rotate", label: "Rotate" },
  { value: "parallax", label: "Parallax" },
  { value: "kinetic", label: "Kinetic" },
  { value: "kinetic_bold", label: "Kinetic Bold" },
];

export const VIDEO_STYLES = [
  { id: "cinematic", name: "Cinematic", description: "Film-like quality" },
  { id: "modern", name: "Modern", description: "Clean, minimalist" },
  { id: "playful", name: "Playful", description: "Fun, energetic" },
  { id: "minimal", name: "Minimal", description: "Simple, elegant" },
  { id: "kinetic", name: "Kinetic", description: "Dynamic text animations" },
  { id: "elegant", name: "Elegant", description: "Refined, sophisticated" },
  { id: "dramatic", name: "Dramatic", description: "High-contrast, impactful" },
  { id: "fun", name: "Fun", description: "Lighthearted, colorful" },
];

export const ASPECT_RATIOS = [
  { value: "16:9", label: "16:9 Landscape", width: 1920, height: 1080 },
  { value: "9:16", label: "9:16 Vertical", width: 1080, height: 1920 },
  { value: "1:1", label: "1:1 Square", width: 1080, height: 1080 },
  { value: "4:3", label: "4:3 Standard", width: 1440, height: 1080 },
];

export const DURATIONS = [15, 30, 60, 120, 180, 300];

export const QUALITY_OPTIONS = [
  { value: "draft", label: "Draft", description: "Fast preview" },
  { value: "standard", label: "Standard", description: "Good quality" },
  { value: "high", label: "High", description: "Best quality" },
  { value: "ultra", label: "Ultra", description: "Maximum quality" },
];

export const GENERATION_PHASES = [
  { key: "init", label: "Initializing", progress: 0 },
  { key: "research", label: "Researching", progress: 10 },
  { key: "storyboard", label: "Creating Storyboard", progress: 30 },
  { key: "visual", label: "Generating Visuals", progress: 50 },
  { key: "audio", label: "Generating Audio", progress: 70 },
  { key: "composition", label: "Composing Video", progress: 85 },
  { key: "rendering", label: "Rendering", progress: 95 },
  { key: "complete", label: "Complete", progress: 100 },
] as const;

export const BILLING_PLANS = {
  free: { name: "Free", price: 0, videoLimit: 1, maxDuration: 30 },
  pro: { name: "Pro", price: 29, videoLimit: 10, maxDuration: 300 },
  enterprise: { name: "Enterprise", price: 199, videoLimit: -1, maxDuration: -1 },
} as const;

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
export const ALLOWED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"];

export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 5000;
export const PAGINATION_DEFAULTS = { page: 1, limit: 20 };
