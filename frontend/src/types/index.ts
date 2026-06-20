export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  locale: string
  timezone: string
  created_at: string
}

export interface Project {
  id: string
  name: string
  description: string | null
  prompt: string
  aspect_ratio: string
  duration_seconds: number
  status: "draft" | "generating" | "rendering" | "ready" | "failed" | "archived"
  progress: number
  quality: string
  output_format: string
  version: number
  tags: string[]
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface ProjectList {
  id: string
  name: string
  description: string | null
  status: Project["status"]
  progress: number
  created_at: string
  updated_at: string
}

export interface Scene {
  id: string
  project_id: string
  order_index: number
  start_time_ms: number
  duration_ms: number
  title: string | null
  description: string | null
  voiceover_text: string | null
  image_prompt: string | null
  image_url: string | null
  motion_type: string
  status: string
  created_at: string
  updated_at: string
}

export interface TokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  has_more: boolean
}
