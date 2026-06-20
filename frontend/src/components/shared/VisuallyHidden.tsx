import React from "react";

interface VisuallyHiddenProps {
  children: React.ReactNode;
  id?: string;
}

export function VisuallyHidden({ children, id }: VisuallyHiddenProps) {
  return (
    <span
      id={id}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
    >
      {children}
    </span>
  );
}
