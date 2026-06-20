import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const allItems: BreadcrumbItem[] = [
    { label: "Home", href: "/dashboard" },
    ...items,
  ];

  return (
    <nav className="flex items-center gap-1 text-sm text-surface-500">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3 w-3" />}
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-surface-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-surface-900 font-medium" : ""}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
