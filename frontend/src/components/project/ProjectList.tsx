import React from "react";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectList({ children, className }: ProjectListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
    </div>
  )
}
