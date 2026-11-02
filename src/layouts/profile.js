/**
 * Profile — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/profile.png
 * The frame includes the tab bar (top at y=803); this route renders inside
 * app/(tabs), so content min-height is the tab-bar top.
 */
export default {
  frame: { w: 412, h: 917 },
  back: { x: 42, y: 70, w: 44, h: 44 },
  avatar: { x: 47, y: 133, w: 69, h: 69 },
  name: { x: 139, y: 140, w: 220, h: 34, size: 28, lines: 1 },
  phone: { x: 139, y: 172, w: 220, h: 24, size: 16 },
  sectionInfo: { x: 54, y: 236, w: 310, h: 22, size: 17 },
  card1: { x: 33, y: 267, w: 344, h: 162, radius: 16 },
  rowH: 54,
  sectionSettings: { x: 54, y: 470, w: 310, h: 22, size: 17 },
  card2: { x: 33, y: 503, w: 344, h: 275, radius: 16 },
  tabBarTop: 803,
  contentBottom: 778,
};
