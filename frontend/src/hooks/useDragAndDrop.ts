import { useState, useCallback, useRef } from "react";

interface DragItem {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

interface UseDragAndDropOptions {
  onDrop: (item: DragItem, targetIndex: number) => void;
}

export function useDragAndDrop({ onDrop }: UseDragAndDropOptions) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const handleDragStart = useCallback((item: DragItem) => {
    setDraggedItem(item);
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    dragCounter.current++;
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (targetIndex: number) => {
      dragCounter.current = 0;
      setDragOverIndex(null);
      if (draggedItem) {
        onDrop(draggedItem, targetIndex);
        setDraggedItem(null);
      }
    },
    [draggedItem, onDrop]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  }, []);

  return {
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
