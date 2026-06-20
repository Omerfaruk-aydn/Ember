import React from "react";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectGrid({ children, className }: ProjectGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  )
}
