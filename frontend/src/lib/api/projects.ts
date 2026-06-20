import { apiClient } from "./client";
import type { Project, ProjectCreateInput, ProjectUpdateInput } from "@/types";

export const projectsApi = {
  list: (page = 1, limit = 20) =>
    apiClient.get<Project[]>("/projects", { params: { page, limit } }),

  get: (id: string) =>
    apiClient.get<Project>(`/projects/${id}`),

  create: (data: ProjectCreateInput) =>
    apiClient.post<Project>("/projects", data),

  update: (id: string, data: ProjectUpdateInput) =>
    apiClient.put<Project>(`/projects/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/projects/${id}`),

  duplicate: (id: string) =>
    apiClient.post<Project>(`/projects/${id}/duplicate`),

  generate: (id: string) =>
    apiClient.post(`/projects/${id}/generate`),

  cancel: (id: string) =>
    apiClient.post(`/projects/${id}/cancel`),

  getProgress: (id: string) =>
    apiClient.get(`/projects/${id}/progress`),

  getExport: (id: string, exportId: string) =>
    apiClient.get(`/projects/${id}/exports/${exportId}`),
};
