import { apiClient } from "./client";
import type { VideoGenerationInput } from "@/types";

export const videosApi = {
  generate: (data: VideoGenerationInput) =>
    apiClient.post("/videos/generate", data),

  getStatus: (projectId: string) =>
    apiClient.get(`/videos/${projectId}/status`),

  cancel: (projectId: string) =>
    apiClient.post(`/videos/${projectId}/cancel`),

  getProgress: (projectId: string) =>
    apiClient.get(`/videos/${projectId}/progress`),
};
