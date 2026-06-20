import React from "react";
import { AbsoluteFill } from "remotion";

interface TextOverlayProps {
  text: string;
  style: Record<string, unknown>;
  animation: string;
  startFrame: number;
  durationFrames: number;
}

export const TextOverlayComponent: React.FC<TextOverlayProps> = ({
  text,
  style,
}) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={style as React.CSSProperties}>
        {text}
      </div>
    </AbsoluteFill>
  );
};
