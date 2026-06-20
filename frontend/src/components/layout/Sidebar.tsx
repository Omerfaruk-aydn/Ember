import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/authStore"
import { Film, LayoutDashboard, FolderOpen, CreditCard, Globe, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/brands", label: "Brands", icon: Globe },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-surface-200 bg-white">
      <div className="flex items-center gap-2 border-b border-surface-200 p-4">
        <Film className="h-6 w-6 text-brand-600" />
        <span className="text-lg font-bold">Motion Clone</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-surface-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-medium text-brand-700">
            {user?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 truncate text-sm">
            <div className="font-medium">{user?.full_name || "User"}</div>
            <div className="truncate text-xs text-surface-500">{user?.email}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
