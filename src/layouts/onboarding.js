/**
 * Onboarding — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/onboarding.png
 *
 * The hero photo is 412 wide at its natural 1236:1181 aspect (393.7 tall), so
 * its transparent diagonal ends exactly where the PNG's does. Content bands:
 * title 462, body 556, CTA 717.
 */
export default {
  frame: { w: 412, h: 917 },
  hero: { x: 0, y: 0, w: 412, h: 405, imgH: 393.7 },
  title: { x: 36, y: 464, w: 340, h: 48, size: 42.5, lineHeight: 48, lines: 1 },
  body: { x: 24, y: 557, w: 364, h: 96, size: 18, lineHeight: 24 },
  cta: { x: 141, y: 717, w: 134, h: 51 },
};
