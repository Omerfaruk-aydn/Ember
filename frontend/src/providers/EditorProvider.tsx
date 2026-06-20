import { createContext, useContext } from "react";
import { useEditorStore } from "@/stores/editorStore";

interface EditorContextType {
  store: ReturnType<typeof useEditorStore>;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditorContext() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditorContext must be used within EditorProvider");
  return ctx;
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const store = useEditorStore();
  return (
    <EditorContext.Provider value={{ store }}>{children}</EditorContext.Provider>
  );
}
