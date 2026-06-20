import { useEffect, useCallback } from "react";

interface KeyBindings {
  [key: string]: (e: KeyboardEvent) => void;
}

export function useKeyboard(bindings: KeyBindings, enabled = true) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const key = [];
      if (e.ctrlKey || e.metaKey) key.push("ctrl");
      if (e.shiftKey) key.push("shift");
      if (e.altKey) key.push("alt");
      key.push(e.key.toLowerCase());

      const combo = key.join("+");

      if (bindings[combo]) {
        e.preventDefault();
        bindings[combo](e);
      }
    },
    [bindings, enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export const DEFAULT_EDITOR_KEYS: KeyBindings = {
  "ctrl+z": () => document.dispatchEvent(new CustomEvent("editor:undo")),
  "ctrl+shift+z": () => document.dispatchEvent(new CustomEvent("editor:redo")),
  "ctrl+s": () => document.dispatchEvent(new CustomEvent("editor:save")),
  "delete": () => document.dispatchEvent(new CustomEvent("editor:delete-selected")),
  "ctrl+d": () => document.dispatchEvent(new CustomEvent("editor:duplicate")),
  "ctrl+a": () => document.dispatchEvent(new CustomEvent("editor:select-all")),
  " ": () => document.dispatchEvent(new CustomEvent("editor:toggle-play")),
};
