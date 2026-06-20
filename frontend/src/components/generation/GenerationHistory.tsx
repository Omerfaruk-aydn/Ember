import React from "react";
import { formatRelativeTime } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";

interface GenerationHistoryItem {
  id: string;
  name: string;
  prompt: string;
  status: string;
  created_at: string;
}

interface GenerationHistoryProps {
  items: GenerationHistoryItem[];
}

export function GenerationHistory({ items }: GenerationHistoryProps) {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-surface-500">
        No generation history yet
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between rounded-lg border border-surface-200 p-3">
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <p className="truncate text-xs text-surface-500">{item.prompt}</p>
          </div>
          <div className="ml-3 flex items-center gap-2">
            <span className="text-xs text-surface-500">{formatRelativeTime(item.created_at)}</span>
            <Badge variant={item.status === "ready" ? "default" : "secondary"}>{item.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
