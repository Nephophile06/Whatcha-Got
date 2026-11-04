/**
 * Create Account — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/create-account.png
 *
 * Measured from the 1236 x 2751 export (3x): the title glyph starts at 72/102,
 * the kaomoji art at 72/149.7, the cat art at 258.7/83, the copy block at
 * 48/232 (Figma tracking ~0.9), the transparent hairline fields at x 103 /
 * w 249.5 (step 83.5), the CTA at 142/614 (r 6), the divider line at y 708.5
 * and the Google row at 144/756. Icon and illustration rects are the *element*
 * boxes (alpha padding included) so `contain` lands the artwork exactly like
 * the PNG.
 */
export default {
  frame: { w: 412, h: 917 },
  hello: { x: 72, y: 99, size: 34, lineHeight: 42, letterSpacing: -1 },
  kaomoji: { x: 72, y: 149.7, w: 126.3, h: 26.2 },
  cat: { x: 238, y: 63, w: 135, h: 165 },
  headerH: 133, // hello.y -> copy.y
  copy: { x: 48, y: 232, w: 316, size: 18, lineHeight: 24, letterSpacing: 0.9 },
  form: { x: 38, y: 363, fieldX: 103, fieldW: 249.5, fieldH: 44, step: 83.5 },
  fields: [
    { key: 'bunny', x: 0, y: -2, w: 50, h: 50 },
    { key: 'thinkingCat', x: 8.3, y: 5.5, w: 34.7, h: 32.7 },
    { key: 'phone', x: -1, y: -6, w: 57, h: 57 },
  ],
  button: { x: 142, y: 614, w: 124, h: 45, size: 18, letterSpacing: 0.9 },
  divider: { x: 67, y: 696.5, w: 278, h: 24, lineY: 708.5, size: 14 },
  google: { x: 144, y: 756, w: 190, h: 45, radius: 6 },
  bowl: { x: 12.8, y: 729, w: 108, h: 98.3 },
};
