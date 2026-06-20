import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Copy, Trash2, ExternalLink } from "lucide-react";

interface ProjectActionsProps {
  projectId: string;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProjectActions({ projectId, onDuplicate, onDelete }: ProjectActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => window.open(`/editor/${projectId}`, "_blank")}>
          <ExternalLink className="mr-2 h-4 w-4" /> Open Editor
        </DropdownMenuItem>
        {onDuplicate && (
          <DropdownMenuItem onClick={() => onDuplicate(projectId)}>
            <Copy className="mr-2 h-4 w-4" /> Duplicate
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={() => onDelete(projectId)} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
