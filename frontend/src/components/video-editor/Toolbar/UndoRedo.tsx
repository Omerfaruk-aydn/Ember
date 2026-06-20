import React from "react";
import { Undo2, Redo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/stores/editorStore";

export function UndoRedo() {
  const { undoStack, redoStack } = useEditorStore()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={undoStack.length === 0}
        onClick={() => useEditorStore.getState().undo()}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={redoStack.length === 0}
        onClick={() => useEditorStore.getState().redo()}
      >
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
