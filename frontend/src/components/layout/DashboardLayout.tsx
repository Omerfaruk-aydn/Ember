import { Outlet, Navigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { Sidebar } from "./Sidebar"

export function DashboardLayout() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-surface-50 p-6">
        <Outlet />
      </main>
    </div>
  )
}
