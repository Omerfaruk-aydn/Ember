import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  modalOpen: string | null;
  theme: "light" | "dark" | "system";
  language: "en" | "tr";
  toasts: Toast[];

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setLanguage: (lang: "en" | "tr") => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        modalOpen: null,
        theme: "system",
        language: "en",
        toasts: [],

        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        openModal: (modalOpen) => set({ modalOpen }),
        closeModal: () => set({ modalOpen: null }),
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),

        addToast: (toast) =>
          set((s) => ({
            toasts: [...s.toasts, { ...toast, id: crypto.randomUUID() }],
          })),

        removeToast: (id) =>
          set((s) => ({
            toasts: s.toasts.filter((t) => t.id !== id),
          })),
      }),
      { name: "ui-storage", partialize: (s) => ({ theme: s.theme, language: s.language }) }
    )
  )
);
