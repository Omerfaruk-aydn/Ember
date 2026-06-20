import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportButton() {
  return (
    <Button className="flex items-center gap-1.5" size="sm">
      <Download className="h-3.5 w-3.5" />
      Export
    </Button>
  )
}
