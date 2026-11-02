/**
 * Account Created — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/account-created-successfully.png
 *
 * The red panel is a very wide ellipse: its top is at y=575 in the centre and
 * falls to ~626 at the screen edges. An 824 x 760 ellipse reproduces that curve.
 * The dimmed Create Account form sits behind it at 40% opacity.
 */
export default {
  frame: { w: 412, h: 917 },
  backdrop: {
    hello: { x: 70, y: 80, w: 130, h: 42, size: 34 },
    kaomoji: { x: 70, y: 122, w: 112, h: 24 },
    cat: { x: 257, y: 50, w: 97, h: 130 },
    copy: { x: 48, y: 237, w: 316, h: 72, size: 16 },
    fieldBox: { x: 106, y: 363, w: 243, h: 44 },
    fieldStep: 84,
    iconOffset: 38,
    iconSize: 34,
    button: { x: 142, y: 535, w: 123, h: 44 },
  },
  dome: { x: -206, y: 575, w: 824, h: 824 },
  bunny: { x: 158, y: 604, w: 96, h: 112 },
  title: { x: 46, y: 715, w: 320, h: 26, size: 20, lines: 1 },
  body: { x: 56, y: 747, w: 312, h: 24, size: 16 },
  button: { x: 137, y: 792, w: 136, h: 44 },
};
