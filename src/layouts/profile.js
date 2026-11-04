/**
 * Profile — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/profile.png (PNG fallback: no Figma MCP available).
 *
 * Values are box rects, measured against the 1x design:
 *   back ink 50,77 (24x21) · avatar circle 47,133 (70) · name ink 140,144
 *   (71x16) · phone ink 140,179 (81x11) · section ink 54,241 / 52,477
 *   card1 fill 33..378 x 267..428 · card2 fill 33..378 x 503..778
 *   separators 321,373 and 562,614,666,720 · tab bar panel top 821.
 *
 * The frame includes the tab bar; this route renders inside app/(tabs), so the
 * stage stops at the tab-bar top and the navigator draws the bar below it.
 */
export default {
  frame: { w: 412, h: 917 },
  back: { x: 40, y: 65, w: 44, h: 44, icon: 32 },
  avatar: { x: 47, y: 133, w: 70, h: 70, icon: 49 },
  name: { x: 139, y: 142, w: 220, size: 20, lines: 1 },
  phone: { x: 139, y: 172, w: 220, size: 17 },
  sectionInfo: { x: 53, y: 236, size: 16 },
  // The cards share one row rhythm: text ink sits 19 px below the row top, and
  // rows are 52 / 53 tall with 1 px separator rules. The extra top/bottom card
  // padding reproduces the Figma fill bounds (267..428 and 503..778).
  card1: { x: 33, y: 267, w: 346, h: 162, radius: 16, padTop: 3, padBottom: 4 },
  rows1: [52, 52, 52],
  sectionSettings: { x: 53, y: 471, size: 16 },
  card2: { x: 33, y: 503, w: 346, h: 276, radius: 16, padTop: 6.5, padBottom: 4 },
  rows2: [53, 53, 53, 53, 53],
  row: {
    padLeft: 33,
    padRight: 33,
    icon: 24,
    gap: 26,
    chevron: 16,
    separatorInset: 21,
    labelSize: 16,
  },
  tabBarTop: 821,
  contentBottom: 779,
};
