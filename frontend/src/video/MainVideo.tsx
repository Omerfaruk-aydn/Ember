import React from "react";
import { AbsoluteFill, Sequence, Audio } from "remotion";
import { Scene } from "./components/Scene";
import { Transition } from "./components/Transition";
import { Captions } from "./components/Captions";
import { calculateSceneTimings } from "./utils/helpers";
import type { SceneData, AudioData, CaptionData, ColorPalette, VideoSettings } from "./types";

interface VideoProps {
  scenes: SceneData[];
  voiceover?: AudioData;
  music?: AudioData;
  captions?: CaptionData[];
  brandColors?: ColorPalette;
  settings: VideoSettings;
}

export const MainVideo: React.FC<VideoProps> = ({
  scenes,
  voiceover,
  music,
  captions,
  brandColors,
  settings,
}) => {
  const fps = 30;
  const sceneTimings = calculateSceneTimings(scenes, fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {music && <Audio src={music.url} volume={music.volume || 0.3} />}
      {voiceover && <Audio src={voiceover.url} volume={1} />}

      {sceneTimings.map((timing, index) => (
        <Sequence
          key={scenes[index].id}
          from={timing.startFrame}
          durationInFrames={timing.durationFrames}
        >
          <Scene data={scenes[index]} brandColors={brandColors} settings={settings} />

          {index < scenes.length - 1 && scenes[index].transition_out && (
            <Transition
              type={scenes[index].transition_out}
              durationFrames={timing.transitionFrames}
              direction="out"
            />
          )}

          {index > 0 && scenes[index].transition_in && (
            <Transition
              type={scenes[index].transition_in}
              durationFrames={timing.transitionFrames}
              direction="in"
            />
          )}
        </Sequence>
      ))}

      {captions && captions.length > 0 && (
        <Captions captions={captions} style={settings.captionStyle} />
      )}
    </AbsoluteFill>
  );
};
