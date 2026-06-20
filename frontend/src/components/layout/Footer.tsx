import { Link } from "react-router-dom";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Film className="h-4 w-4" />
          <span>Motion Clone</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-4 text-sm text-surface-500">
          <Link to="/settings" className="hover:text-surface-900">Settings</Link>
          <Link to="/billing" className="hover:text-surface-900">Billing</Link>
        </div>
      </div>
    </footer>
  );
}
