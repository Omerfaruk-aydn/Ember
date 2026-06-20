import React from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
  children: React.ReactNode;
  className?: string;
}

export function Editor({ children, className }: EditorProps) {
  return (
    <div className={cn("editor-container", className)}>
      {children}
    </div>
  );
}
