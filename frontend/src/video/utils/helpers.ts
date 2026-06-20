import type { TextOverlay, ColorPalette } from "../types";

export function calculateSceneTimings(
  scenes: Array<{ id: string; duration_ms: number }>,
  fps: number
) {
  let currentFrame = 0;
  const transitionFrames = Math.round(0.5 * fps);

  return scenes.map((scene, index) => {
    const durationFrames = Math.round((scene.duration_ms / 1000) * fps);
    const startFrame = currentFrame;
    currentFrame += durationFrames;

    return {
      sceneId: scene.id,
      startFrame,
      durationFrames,
      endFrame: startFrame + durationFrames,
      transitionFrames: index < scenes.length - 1 ? transitionFrames : 0,
    };
  });
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${Math.floor(milliseconds / 100)}`;
}

export function getResolution(aspectRatio: string): { width: number; height: number } {
  const resolutions: Record<string, { width: number; height: number }> = {
    "16:9": { width: 1920, height: 1080 },
    "9:16": { width: 1080, height: 1920 },
    "1:1": { width: 1080, height: 1080 },
    "4:3": { width: 1440, height: 1080 },
  };
  return resolutions[aspectRatio] || resolutions["16:9"];
}

export function fpsToMs(fps: number): number {
  return 1000 / fps;
}

export function msToFrames(ms: number, fps: number): number {
  return Math.round((ms / 1000) * fps);
}

export function framesToMs(frames: number, fps: number): number {
  return Math.round((frames / fps) * 1000);
}
