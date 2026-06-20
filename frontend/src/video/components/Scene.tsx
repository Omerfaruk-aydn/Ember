import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { applyMotion, applyEffects } from "../utils/effects";
import type { SceneData, ColorPalette, VideoSettings } from "../types";

interface SceneProps {
  data: SceneData;
  brandColors?: ColorPalette;
  settings: VideoSettings;
}

export const Scene: React.FC<SceneProps> = ({ data, brandColors, settings }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const motionStyle = applyMotion(
    data.motion_type,
    frame,
    data.duration_ms,
    data.animation_duration_ms,
    data.animation_easing
  );

  const effectsStyle = applyEffects(data.effects, frame);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ ...motionStyle, ...effectsStyle }}>
        {data.image_url ? (
          <Img
            src={data.image_url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${brandColors?.background || "#0a0a0f"} 0%, ${brandColors?.primary || "#1a1c50"} 100%)`,
            }}
          />
        )}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {data.text_overlays?.map((overlay, index) => {
        const overlayProgress = interpolate(
          frame,
          [overlay.start_ms / (1000 / fps), (overlay.start_ms + overlay.duration_ms) / (1000 / fps)],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const animationStyle: React.CSSProperties = {
          position: "absolute",
          left: `${overlay.position.x}%`,
          top: `${overlay.position.y}%`,
          transform: "translate(-50%, -50%)",
          ...overlay.style,
          opacity: overlay.animation === "fade_in" ? overlayProgress : 1,
        };

        if (overlay.animation === "scale_up") {
          const scale = interpolate(overlayProgress, [0, 1], [0.5, 1]);
          animationStyle.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        return (
          <div key={index} style={animationStyle}>
            {overlay.text}
          </div>
        );
      })}

      {settings.showWatermark && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            opacity: 0.5,
            fontSize: 14,
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          Motion Clone
        </div>
      )}
    </AbsoluteFill>
  );
};
