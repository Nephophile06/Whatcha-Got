/**
 * Design stage — maps the 412 x 917 Figma frame onto the real, edge-to-edge
 * app canvas.
 *
 * - The canvas is measured by <StageProvider> from the root container
 *   (onLayout), never from Dimensions, so system bars are included.
 * - Stage width is capped at 480 and centred on tablets/web. Backgrounds are
 *   rendered by each screen at canvas size.
 * - k = W / 412, v = H / 917, u = clamp(min(k, v), 0.75, 1.3).
 *   fx/fy position elements from Figma coordinates. s() sizes art, icons,
 *   buttons, radii, gaps and base font sizes.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 917;
export const MAX_STAGE_WIDTH = 480;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const StageContext = createContext(null);

function buildStage(canvas, insets) {
  const W = Math.min(canvas.width, MAX_STAGE_WIDTH);
  const H = canvas.height;
  const k = W / BASE_WIDTH;
  const v = H / BASE_HEIGHT;
  const u = clamp(Math.min(k, v), 0.75, 1.3);
  const offsetX = Math.max((canvas.width - W) / 2, 0);

  return {
    W,
    H,
    aspect: H === 0 ? BASE_HEIGHT / BASE_WIDTH : W / H,
    canvasW: canvas.width,
    canvasH: canvas.height,
    offsetX,
    insets,
    k,
    v,
    u,
    /** Horizontal position / size from a Figma x or width. */
    fx: (n) => Math.round(n * k * 100) / 100,
    /** Vertical position / size from a Figma y or height. */
    fy: (n) => Math.round(n * v * 100) / 100,
    /** Aspect-preserving size from a Figma length. */
    s: (n) => Math.round(n * u * 100) / 100,
  };
}

export function StageProvider({ children }) {
  const insets = useSafeAreaInsets();
  const window = useWindowDimensions();
  const [measured, setMeasured] = useState(null);

  // A rotation or window resize invalidates the previous measurement; the next
  // onLayout pass supplies the new canvas.
  useEffect(() => {
    setMeasured(null);
  }, [window.width, window.height]);

  const canvas = useMemo(() => {
    if (
      measured &&
      measured.width > 0 &&
      measured.height > 0 &&
      Math.abs(measured.width - window.width) < 2
    ) {
      return measured;
    }
    return { width: window.width, height: window.height };
  }, [measured, window.width, window.height]);

  const stage = useMemo(() => buildStage(canvas, insets), [canvas, insets]);

  return (
    <StageContext.Provider value={stage}>
      <View
        style={{ flex: 1 }}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setMeasured((current) =>
            current &&
            Math.abs(current.width - width) < 0.5 &&
            Math.abs(current.height - height) < 0.5
              ? current
              : { width, height }
          );
        }}
      >
        {children}
      </View>
    </StageContext.Provider>
  );
}

/**
 * useStage() — stage metrics for screens and layout components.
 * Falls back to the window when a component is rendered outside the provider.
 */
export function useStage() {
  const context = useContext(StageContext);
  const insets = useSafeAreaInsets();
  const window = useWindowDimensions();
  const fallback = useMemo(
    () => buildStage({ width: window.width, height: window.height }, insets),
    [window.width, window.height, insets]
  );
  return context || fallback;
}

export default useStage;
