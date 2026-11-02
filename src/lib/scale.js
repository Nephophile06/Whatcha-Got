/**
 * Layout scale — the Figma frames are 412 x 917.
 *
 * Large regions are always sized with percentage heights derived from the
 * design; useScale() is for horizontal sizes, radii, spacing and small
 * decorations. Widths are clamped so a phone is never squeezed below 0.85x
 * or stretched past 1.25x of the design.
 */
import { useWindowDimensions } from 'react-native';

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 917;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function useScale() {
  const { width, height } = useWindowDimensions();
  const scale = clamp(width / BASE_WIDTH, 0.85, 1.25);

  return {
    width,
    height,
    scale,
    /** Horizontal size, radius or spacing scaled from the 412px frame. */
    sw: (value) => Math.round(value * scale * 100) / 100,
    /** Percentage of the current viewport height (7 => 7%). */
    vh: (percent) => Math.round(((height * percent) / 100) * 100) / 100,
    isCompact: height < 720,
    isShort: height < 660,
  };
}

export default useScale;
