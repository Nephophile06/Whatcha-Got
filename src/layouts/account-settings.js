/**
 * Account Settings — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/account-settings.png (PNG fallback: no Figma MCP).
 *
 * Measured against the 1x design:
 *   back ink 50,77 (25x21) · avatar 47,133 (70) · name ink 140,144 (71x16)
 *   phone ink 140,179 (81x11) · "Update password" ink 149,241 (114x14)
 *   fields x82..331, 45 tall, tops 268 / 325 / 382 (57 step), radius 5,
 *   1px 50% black stroke, transparent fill; placeholders at x95, 14px.
 *   done button x147..263, y450..491 (117x42, radius ~7), white 20px label.
 *   "Update Phone Number" ink 132,560 (151x16) · field4 top 588
 *   send button x140..271, y656..697 (132x42).
 *   Tab bar panel top 821 (same as Profile).
 *
 * Text tops are the AppText line-box origins (16px body ink sits 5px below).
 */
export default {
  frame: { w: 412, h: 917 },
  back: { x: 40, y: 65, w: 44, h: 44, icon: 32 },
  avatar: { x: 47, y: 133, w: 70, h: 70, icon: 49 },
  name: { x: 139, y: 142, w: 220, size: 20, lines: 1 },
  phone: { x: 139, y: 172, w: 220, size: 17 },
  heading1: { y: 236, size: 16 },
  field: { x: 82, w: 250, h: 45, radius: 5, textInset: 12, labelSize: 14 },
  field1Y: 268,
  field2Y: 325,
  field3Y: 382,
  done: { y: 450, w: 117, h: 42, radius: 7, size: 18 },
  heading2: { y: 555, size: 16 },
  field4Y: 588,
  send: { y: 656, w: 132, h: 42, radius: 7, size: 18 },
  error1Y: 430,
  error2Y: 637,
  tabBarTop: 821,
  contentBottom: 697,
};
