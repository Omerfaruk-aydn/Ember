import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import type { SceneData, VideoSettings } from "./types";

const defaultScenes: SceneData[] = [
  {
    id: "scene-1",
    title: "Opening",
    description: "Opening scene with brand intro",
    image_url: null,
    image_prompt: "Professional opening shot",
    duration_ms: 5000,
    motion_type: "fade",
    animation_duration_ms: 500,
    animation_easing: "easeInOut",
    effects: [],
    text_overlays: [],
    transition_in: "fade",
    transition_out: "fade",
    transition_duration_ms: 500,
    voiceover_text: null,
    voiceover_url: null,
  },
];

const defaultSettings: VideoSettings = {
  showWatermark: false,
  captionStyle: {
    fontSize: 32,
    fontFamily: "sans-serif",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "bottom",
  },
  textOverlays: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={30 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: defaultScenes,
          settings: defaultSettings,
        }}
      />

      <Composition
        id="VerticalVideo"
        component={MainVideo}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: defaultScenes,
          settings: defaultSettings,
        }}
      />

      <Composition
        id="SquareVideo"
        component={MainVideo}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          scenes: defaultScenes,
          settings: defaultSettings,
        }}
      />
    </>
  );
};
