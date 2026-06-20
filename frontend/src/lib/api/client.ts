import axios from "axios"
import type { TokenResponse } from "@/types"

const API_BASE = "/api/v1"

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
})

let accessToken: string | null = null
let refreshToken: string | null = null

export function setTokens(access: string, refresh: string) {
  accessToken = access
  refreshToken = refresh
  localStorage.setItem("access_token", access)
  localStorage.setItem("refresh_token", refresh)
}

export function clearTokens() {
  accessToken = null
  refreshToken = null
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
}

export function loadTokens() {
  accessToken = localStorage.getItem("access_token")
  refreshToken = localStorage.getItem("refresh_token")
}

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true
      try {
        const { data } = await axios.post<TokenResponse>(`${API_BASE}/auth/refresh`, {
          refresh_token: refreshToken,
        })
        setTokens(data.access_token, data.refresh_token)
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return apiClient(originalRequest)
      } catch {
        clearTokens()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  register: (email: string, password: string, full_name?: string) =>
    apiClient.post<TokenResponse>("/auth/register", { email, password, full_name }),
  login: (email: string, password: string) =>
    apiClient.post<TokenResponse>("/auth/login", { email, password }),
  getMe: () => apiClient.get("/auth/me"),
}

export const projectsApi = {
  list: (page = 1, limit = 20) =>
    apiClient.get("/projects", { params: { page, limit } }),
  get: (id: string) => apiClient.get(`/projects/${id}`),
  create: (data: { name: string; prompt: string; description?: string }) =>
    apiClient.post("/projects", data),
  update: (id: string, data: Record<string, unknown>) =>
    apiClient.put(`/projects/${id}`, data),
  delete: (id: string) => apiClient.delete(`/projects/${id}`),
}

export const scenesApi = {
  list: (projectId: string) => apiClient.get(`/projects/${projectId}/scenes`),
  get: (projectId: string, sceneId: string) =>
    apiClient.get(`/projects/${projectId}/scenes/${sceneId}`),
  create: (projectId: string, data: Record<string, unknown>) =>
    apiClient.post(`/projects/${projectId}/scenes`, data),
  update: (projectId: string, sceneId: string, data: Record<string, unknown>) =>
    apiClient.put(`/projects/${projectId}/scenes/${sceneId}`, data),
  delete: (projectId: string, sceneId: string) =>
    apiClient.delete(`/projects/${projectId}/scenes/${sceneId}`),
}
