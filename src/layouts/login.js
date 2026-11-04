/**
 * Login — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/login.png (1236 x 2751, exact 3x export).
 *
 * Art rects are the *image boxes*, solved from the PNG ink and each asset's
 * alpha bounds (so the visible ink lands exactly on the design):
 * - cherries: red ink 38.3/62.3 120.7 x 53.7 -> box 150.5 x 112.4 (stems run
 *   up behind the status bar, as in the PNG).
 * - banana: ink 325/65.7 87 x 151 -> box 120 x 200.8 (cropped by the screen).
 * - duck: outline ink 37/661.3 165 x 190 -> box 212.7 x 221.7.
 * - field icons: bunny ink 57/305 29 x 31, cat ink 58/388 32 x 30.
 *
 * Form: transparent hairline fields (249.4 x 44, radius 4.5, #787D73) at
 * x 113.2, first field at y 297, 84 step. Placeholder ink starts at x 125.
 */
export default {
  frame: { w: 412, h: 917 },

  cherries: { x: 23.9, y: 18.5, w: 150.5, h: 112.4 },
  banana: { x: 293.1, y: 42.9, w: 119, h: 199.1 },

  title: { x: 35, y: 149.3, w: 342, h: 40, size: 33, lines: 1 },
  copy: { x: 35, y: 207, w: 330, h: 46, size: 18, lineH: 1.28 },

  form: { y: 297 },
  field: { x: 113.2, w: 249.4, h: 44, step: 84, radius: 4.5, border: 1, padH: 11 },

  icons: {
    bunny: { x: 48.3, y: 295.6, w: 50.3, h: 50.3 },
    cat: { x: 57, y: 386.6, w: 34.7, h: 32.7 },
  },

  forgot: { right: 50, top: 428.5, h: 13, size: 14, lineH: 44 },
  button: { y: 496, w: 104, h: 45, radius: 8, size: 18 },
  divider: { y: 558, w: 280, rowH: 24, size: 14, gap: 10 },
  google: { y: 597, w: 175, h: 46, radius: 9, size: 14, icon: 27.2, iconGap: 1 },

  // Flows directly under the Google button (no overlap on short phones); the
  // stage leaves the 52px white tail below it at the design height.
  duck: { x: 0.3, y: 643.3, w: 212.7, h: 221.7 },
};
