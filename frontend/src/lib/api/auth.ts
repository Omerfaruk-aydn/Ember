import { apiClient } from "./client";
import type { TokenResponse } from "@/types";

export const authApi = {
  register: (email: string, password: string, fullName?: string) =>
    apiClient.post<TokenResponse>("/auth/register", {
      email,
      password,
      full_name: fullName,
    }),

  login: (email: string, password: string) =>
    apiClient.post<TokenResponse>("/auth/login", { email, password }),

  refresh: (refreshToken: string) =>
    apiClient.post<TokenResponse>("/auth/refresh", { refresh_token: refreshToken }),

  logout: () => apiClient.post("/auth/logout"),

  getMe: () => apiClient.get("/auth/me"),

  forgotPassword: (email: string) =>
    apiClient.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post("/auth/reset-password", { token, new_password: newPassword }),
};
