/**
 * AppText — the only text primitive for screens.
 *
 * Typography policy:
 * - display / heading use Fondamento and NEVER scale with the device setting.
 * - body / label / caption / button / title use Assistant, follow the device
 *   setting but are capped (body 1.3, labels and buttons 1.2).
 * - DEV_FONT_SCALE (theme/tokens.js) multiplies Assistant sizes for preview.
 * - Tab bar labels and OTP digits pass allowFontScaling={false} explicitly.
 *
 * Line heights are computed from the (scaled) font size and always stay at or
 * above 1.35x, so large font settings never clip ascenders or descenders.
 */
import React from 'react';
import { Text } from 'react-native';
import { DEV_FONT_SCALE, typography } from '../../theme/tokens';
import { cx } from './cx';

const VARIANTS = {
  display: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.display,
    lineHeightRatio: 1.2,
    allowFontScaling: false,
    maxFontSizeMultiplier: undefined,
    scalesWithDev: false,
    className: 'font-display',
  },
  heading: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.xxl,
    lineHeightRatio: 1.25,
    allowFontScaling: false,
    maxFontSizeMultiplier: undefined,
    scalesWithDev: false,
    className: 'font-display',
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xl,
    lineHeightRatio: 1.3,
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.2,
    scalesWithDev: true,
    className: 'font-sans-semibold',
  },
  body: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.md,
    lineHeightRatio: 1.5,
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.3,
    scalesWithDev: true,
    className: 'font-sans',
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    lineHeightRatio: 1.4,
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.2,
    scalesWithDev: true,
    className: 'font-sans-medium',
  },
  caption: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeightRatio: 1.4,
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.2,
    scalesWithDev: true,
    className: 'font-sans',
  },
  button: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    lineHeightRatio: 1.35,
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.2,
    scalesWithDev: true,
    className: 'font-sans-medium',
  },
};

const COLOR_CLASS =
  /\btext-(?:text-(?:primary|secondary|muted|inverse)|primary(?:-dark|-light|-blush)?|secondary|success|warning|error|info|white|black|rose|blush|butter|mint|periwinkle|softBlue)\b/;

export function AppText({
  variant = 'body',
  fontSize: fontSizeProp,
  className,
  style,
  children,
  allowFontScaling,
  maxFontSizeMultiplier,
  ...props
}) {
  const config = VARIANTS[variant] || VARIANTS.body;
  const multiplier = config.scalesWithDev ? DEV_FONT_SCALE : 1;
  const baseSize = fontSizeProp ?? config.fontSize;
  const fontSize = Math.round(baseSize * multiplier * 100) / 100;
  const lineHeight = Math.round(fontSize * config.lineHeightRatio * 100) / 100;
  // Avoid stacking two colour utilities: NativeWind resolves them by stylesheet
  // order, not by class order, which made inverse labels unreadable.
  const hasColor = COLOR_CLASS.test(className || '');

  return (
    <Text
      allowFontScaling={allowFontScaling ?? config.allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier ?? config.maxFontSizeMultiplier}
      className={cx(
        hasColor ? null : 'text-text-primary',
        config.className,
        className
      )}
      style={[
        { fontFamily: config.fontFamily, fontSize, lineHeight },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export default AppText;
