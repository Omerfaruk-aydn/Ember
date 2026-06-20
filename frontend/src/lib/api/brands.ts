import { apiClient } from "./client";
import type { Brand, BrandCreateInput, BrandUpdateInput } from "@/types";

export const brandsApi = {
  list: () =>
    apiClient.get<Brand[]>("/brands"),

  get: (id: string) =>
    apiClient.get<Brand>(`/brands/${id}`),

  create: (data: BrandCreateInput) =>
    apiClient.post<Brand>("/brands", data),

  update: (id: string, data: BrandUpdateInput) =>
    apiClient.put<Brand>(`/brands/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/brands/${id}`),

  analyze: (id: string) =>
    apiClient.post(`/brands/${id}/analyze`),

  refresh: (id: string) =>
    apiClient.post(`/brands/${id}/refresh`),

  getColors: (id: string) =>
    apiClient.get(`/brands/${id}/colors`),

  getTypography: (id: string) =>
    apiClient.get(`/brands/${id}/typography`),
};
