import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function Navigation({ items }: { items: NavItem[] }) {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => {
        const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-50 text-brand-700"
                : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
