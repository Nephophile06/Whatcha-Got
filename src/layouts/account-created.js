/**
 * Account Created — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/account-created-successfully.png
 *
 * The burgundy panel is the top of a 900px-wide circle whose top is at y 578:
 * its edge falls from 578 at the centre to ~626 at the screen edges, which
 * matches the PNG within ~2px. The dimmed Create Account form behind it is a
 * different composition from the real screen: the title and cat sit ~23px
 * higher, the fields keep the same 363/447 positions and the CTA is at 535.
 *
 * Measured on the 1236 x 2751 export (3x): hello ink 73/79 (88 wide, Fondamento
 * tracking -1), kaomoji 72/127 (126.3), cat 263/61, copy lines at 237/261/286
 * (18px + 0.9 tracking), fields 103/363 + 84 step (250 x 45), dimmed CTA
 * 144/535 (124 x 45), dome top 578, bunny ink 178/600 (57 x 107), title
 * 120/724 (18px), body 54/750, CTA 136/791 (139 x 45, radius 8).
 */
export default {
  frame: { w: 412, h: 917 },
  backdrop: {
    hello: { x: 72, y: 77, size: 34, letterSpacing: -1 },
    kaomoji: { x: 72, y: 126.7, w: 126.3, h: 26.2 },
    cat: { x: 238, y: 41, w: 135, h: 165 },
    copy: {
      x: 48,
      y: 231,
      w: 316,
      size: 18,
      lineHeight: 24,
      letterSpacing: 0.9,
    },
    form: { x: 38, y: 363, fieldX: 103, fieldW: 249.5, fieldH: 45, step: 84 },
    fields: [
      { key: 'bunny', x: 0, y: -2, w: 50, h: 50 },
      { key: 'thinkingCat', x: 8.3, y: 5.5, w: 34.7, h: 32.7 },
    ],
    button: { x: 144, y: 535, w: 124, h: 45, radius: 8, size: 18 },
  },
  dome: { x: -244, y: 578, w: 900, h: 900, radius: 450 },
  bunny: { x: 152, y: 587, w: 114, h: 134 },
  title: { x: 46, y: 723, w: 320, h: 22, size: 18, lines: 1 },
  body: { x: 56, y: 745, w: 312, h: 24, size: 16 },
  button: { x: 136, y: 791, w: 139, h: 45, radius: 8, size: 18, letterSpacing: 0.4 },
};
