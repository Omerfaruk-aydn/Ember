import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { CaptionData } from "../types";

interface CaptionsProps {
  captions: CaptionData[];
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
  };
}

export const Captions: React.FC<CaptionsProps> = ({ captions, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;

  const activeCaption = captions.find(
    (c) => currentTimeMs >= c.start_ms && currentTimeMs <= c.end_ms
  );

  if (!activeCaption) return null;

  const captionProgress = interpolate(
    currentTimeMs,
    [activeCaption.start_ms, activeCaption.end_ms],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = captionProgress < 0.1 ? captionProgress * 10 : captionProgress > 0.9 ? (1 - captionProgress) * 10 : 1;

  return (
    <div
      style={{
        position: "absolute",
        bottom: style?.backgroundColor ? 80 : 60,
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "80%",
        padding: style?.backgroundColor ? "8px 16px" : "4px 0",
        backgroundColor: style?.backgroundColor || "transparent",
        borderRadius: style?.backgroundColor ? 8 : 0,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: style?.fontSize || 32,
          fontFamily: style?.fontFamily || "sans-serif",
          color: style?.color || "white",
          textAlign: "center",
          textShadow: style?.backgroundColor ? "none" : "2px 2px 4px rgba(0,0,0,0.8)",
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {activeCaption.text}
      </span>
    </div>
  );
};
