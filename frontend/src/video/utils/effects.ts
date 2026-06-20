import type { CSSProperties } from "react";
import type { Effect } from "../types";

export function applyMotion(
  type: string,
  frame: number,
  durationMs: number,
  animationDurationMs: number,
  _easing: string
): CSSProperties {
  const durationFrames = (durationMs / 1000) * 30;
  const animationFrames = (animationDurationMs / 1000) * 30;
  const progress = Math.min(frame / Math.max(animationFrames, 1), 1);

  switch (type) {
    case "fade":
      return { opacity: progress };

    case "slide_left":
      return { transform: `translateX(${(1 - progress) * 100}%)` };

    case "slide_right":
      return { transform: `translateX(${(progress - 1) * 100}%)` };

    case "slide_up":
      return { transform: `translateY(${(1 - progress) * 100}%)` };

    case "slide_down":
      return { transform: `translateY(${(progress - 1) * 100}%)` };

    case "zoom_in":
      return {
        transform: `scale(${1 + (frame / Math.max(durationFrames, 1)) * 0.2})`,
      };

    case "zoom_out":
      return {
        transform: `scale(${1.2 - (frame / Math.max(durationFrames, 1)) * 0.2})`,
      };

    case "kinetic":
      return {
        transform: `translateX(${(1 - progress) * 30}px) rotate(${(1 - progress) * -3}deg)`,
        opacity: progress,
      };

    case "parallax":
      return {
        transform: `translateY(${(frame / Math.max(durationFrames, 1)) * -30}px) scale(1.1)`,
      };

    default:
      return {};
  }
}

export function applyEffects(effects: Effect[], _frame: number): CSSProperties {
  if (!effects || effects.length === 0) return {};

  const filters: string[] = [];

  for (const effect of effects) {
    switch (effect.type) {
      case "blur":
        filters.push(`blur(${effect.intensity * 10}px)`);
        break;
      case "brightness":
        filters.push(`brightness(${1 + effect.intensity})`);
        break;
      case "contrast":
        filters.push(`contrast(${1 + effect.intensity})`);
        break;
      case "saturate":
        filters.push(`saturate(${1 + effect.intensity})`);
        break;
      case "grayscale":
        filters.push(`grayscale(${effect.intensity})`);
        break;
      case "sepia":
        filters.push(`sepia(${effect.intensity})`);
        break;
      case "hue-rotate":
        filters.push(`hue-rotate(${effect.intensity * 360}deg)`);
        break;
    }
  }

  return filters.length > 0 ? { filter: filters.join(" ") } : {};
}

export function getEasingFunction(easing: string): (t: number) => number {
  switch (easing) {
    case "easeIn":
      return (t) => t * t;
    case "easeOut":
      return (t) => 1 - (1 - t) * (1 - t);
    case "easeInOut":
      return (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    case "spring":
      return (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      };
    default:
      return (t) => t;
  }
}
