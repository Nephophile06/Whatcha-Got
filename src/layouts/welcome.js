/**
 * Welcome / sign-up selection — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/sign-up-selection.png
 *
 * The photo is the 1236:1770 asset at 412 wide (590 tall) so its crop matches
 * the PNG; the burgundy panel starts at 514 with a 75px top corner. Copy is
 * 18/24 and sits at glyph y 582, tagline 667, CTA 734, login glyph 808.
 *
 * Figma inconsistency: the copy is centred at x 205.8 but the Signup pill and
 * the login row are centred at x 210.7 (4.9px right of centre). The rects above
 * follow the PNG exactly rather than "fixing" it.
 */
export default {
  frame: { w: 412, h: 917 },
  photo: { x: 0, y: 0, w: 412, h: 605, imgH: 590 },
  panel: { x: 0, y: 514, w: 412, h: 403, radius: 75 },
  almonds: { x: 0, y: 415, w: 126, h: 126, imgX: 0, imgY: 8, imgW: 117.6, imgH: 161.7 },
  copy: { x: 46, y: 576, w: 320, h: 72, size: 18, lineHeight: 24 },
  tagline: { x: 36, y: 661, w: 340, h: 24, size: 19, lineHeight: 24 },
  button: { x: 149, y: 734, w: 124, h: 48, size: 18 },
  login: { x: 70.7, y: 792, w: 280, h: 44, size: 19, lineHeight: 24 },
};
