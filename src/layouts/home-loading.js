/**
 * Home Loading — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/home-loading-state.png
 *
 * The plate art is login-badge.png at its native 200 x 200; its opaque ink is
 * (12, 29) 175 x 142, which lands at (117.7, 328) in the design. The file is
 * therefore placed at (105.7, 299), not at the ink box: contain-fitting a square
 * into a 174 x 140 box shrank the whole illustration by 30%.
 */
export default {
  frame: { w: 412, h: 917 },
  cup: { x: 105.7, y: 299, w: 200, h: 200 },
};
