import React, { useState } from "react";
import { SearchInput } from "@/components/shared/SearchInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function ProjectFilters({ search, onSearchChange, status, onStatusChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search projects..."
        className="w-64"
      />
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="generating">Generating</SelectItem>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
