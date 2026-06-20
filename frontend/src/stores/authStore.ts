import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User } from "@/types"
import { authApi, setTokens, clearTokens, loadTokens } from "@/lib/api/client"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName?: string) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (email, password) => {
          set({ isLoading: true })
          try {
            const { data } = await authApi.login(email, password)
            setTokens(data.access_token, data.refresh_token)
            const meRes = await authApi.getMe()
            set({ user: meRes.data as User, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        register: async (email, password, fullName) => {
          set({ isLoading: true })
          try {
            const { data } = await authApi.register(email, password, fullName)
            setTokens(data.access_token, data.refresh_token)
            const meRes = await authApi.getMe()
            set({ user: meRes.data as User, isAuthenticated: true, isLoading: false })
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: () => {
          clearTokens()
          set({ user: null, isAuthenticated: false })
        },

        fetchUser: async () => {
          loadTokens()
          try {
            const meRes = await authApi.getMe()
            set({ user: meRes.data as User, isAuthenticated: true })
          } catch {
            clearTokens()
            set({ user: null, isAuthenticated: false })
          }
        },

        setUser: (user) => set({ user }),
      }),
      { name: "auth-storage", partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
    )
  )
)
