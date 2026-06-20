import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

interface TransitionProps {
  type: string;
  durationFrames: number;
  direction: "in" | "out";
}

export const Transition: React.FC<TransitionProps> = ({ type, durationFrames, direction }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const p = direction === "in" ? progress : 1 - progress;

  switch (type) {
    case "fade":
      return (
        <AbsoluteFill style={{ opacity: p, backgroundColor: "black" }} />
      );

    case "slide_left":
      return (
        <AbsoluteFill
          style={{
            transform: `translateX(${(1 - p) * 100}%)`,
            backgroundColor: "black",
          }}
        />
      );

    case "slide_right":
      return (
        <AbsoluteFill
          style={{
            transform: `translateX(${(p - 1) * 100}%)`,
            backgroundColor: "black",
          }}
        />
      );

    case "wipe":
      return (
        <AbsoluteFill
          style={{
            clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
            backgroundColor: "black",
          }}
        />
      );

    case "zoom":
      const scale = interpolate(p, [0, 1], [0.8, 1]);
      return (
        <AbsoluteFill
          style={{
            transform: `scale(${scale})`,
            opacity: p,
            backgroundColor: "black",
          }}
        />
      );

    case "dissolve":
      return (
        <AbsoluteFill
          style={{
            opacity: p,
            background: `radial-gradient(circle, transparent ${(1 - p) * 100}%, black ${(1 - p) * 100}%)`,
          }}
        />
      );

    default:
      return (
        <AbsoluteFill style={{ opacity: p, backgroundColor: "black" }} />
      );
  }
};
