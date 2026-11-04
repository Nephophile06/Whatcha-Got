/**
 * Home Dashboard — Figma rects in the 412 x 917 reference frame.
 * Source: design/screens/home-dashboard.png
 *
 * The banner export is 1236 x 636 (3x a 412 x 212 image); the Figma frame shows
 * only its lower 178 rows, so the image is drawn at full width/height and the
 * overflow container clips the top 34.
 *
 * Margins in the screen are computed as `designY - (previousY + previousH)`,
 * but AppText line boxes are taller than the ink rects used here. Values marked
 * "render" already include that offset so the painted ink lands on the design:
 *   title ink 264, subtitle ink 309, search border 359..406, grid 442..714,
 *   continue 744..792, skip ink 820.
 */
export default {
  frame: { w: 412, h: 917 },
  hero: { x: 0, y: 44, w: 412, h: 178, artH: 212, crop: 34 },
  // Fondamento: design ink 309 x 37 at (50, 264); 33px matches the width.
  title: { x: 30, y: 262, w: 352, h: 38, size: 33, lines: 1 },
  subtitle: { x: 40, y: 300, w: 332, h: 24, size: 16 },
  // Search field: 58..352 x 359..406, radius 10, 1px hairline.
  search: {
    x: 58,
    y: 357,
    w: 294,
    h: 48,
    r: 10,
    inset: 19,
    icon: 26,
    iconRight: 6,
  },
  // Grid: 4 tiles 84 wide, 10 gaps; rows 84 high, 10 apart (442, 536, 630).
  grid: { x: 22.5, y: 440, w: 366, h: 272 },
  // Tile art: the designer placed each category PNG at nativeSize/3 (assets are
  // 3x exports). Art band 50 + label gap 5 puts the art canvas bottom at
  // tileTop+51 and the label ink at tileTop+60, matching every row.
  tile: {
    w: 84,
    h: 84,
    gap: 10,
    r: 8,
    artBand: 51,
    labelGap: 3,
    labelSize: 14,
    // Exported asset pixels / 3 (the source PNGs are 3x). dy is the designer's
    // per-tile vertical nudge of the canvas against the common art baseline:
    // the burger sits lower, the fried rice higher, the rest are 1-3px tweaks.
    art: {
      smoothies: { w: 35, h: 42, dy: -1 },
      dessert: { w: 39, h: 39, dy: -2 },
      salad: { w: 42, h: 42, dy: 2 },
      pancake: { w: 52, h: 42, dy: -1 },
      burger: { w: 48, h: 48, dy: 5 },
      'fried-rice': { w: 48, h: 29, dy: -8 },
      ramen: { w: 37, h: 39, dy: -1 },
      drinks: { w: 39, h: 39, dy: -2 },
      soup: { w: 42, h: 33, dy: -2 },
      pasta: { w: 39, h: 39, dy: -1 },
      pudding: { w: 43, h: 38, dy: -2 },
      fries: { w: 42, h: 36, dy: -3 },
    },
  },
  continue: { x: 149, y: 742, w: 114, h: 48, r: 8, size: 18.5 },
  skip: { x: 161, y: 803, w: 90, h: 30, size: 18 },
};
