/**
 * Forgot Password — rects measured on design/screens/forgot-password.png
 * (1236×2751 = 3×412×917). All values are in the 412×917 frame.
 *
 * Bands (Figma Y, 1x): broccoli ink 83, title ink 97, copy ink 164,
 * prompt ink 255, cards 285 / 397, check 539, watercolour art 600.
 */
export default {
  frame: { w: 412, h: 917 },

  // The broccoli PNG keeps 19px of transparent padding above its ink, so the
  // image box starts at 64.4 and is 141.2 wide to land the visible 130×127
  // broccoli at x0 / y83.
  broccoli: { x: 0, y: 64.4, w: 141.2, h: 162.1 },

  // Fondamento 23 with a 24.3 line box: ink 160×22 and 132×28, tops 99.7/124.
  // Chrome adds a ~2px left side bearing on "N", hence the 153.5 box.
  title: { x: 153.5, y: 97, w: 240, h: 48.6, size: 23, lineH: 24.3 },
  // Assistant 16, 21.4 line box: ink tops 164.3 / 185.7, line 2 ends at 379.
  // The 257 frame reaches the screen edge and keeps the forced second line from
  // wrapping once AppText clamps at 0.85 on narrow stages.
  copy: { x: 153.8, y: 158.9, w: 257, h: 42.8, size: 16, lineH: 21.4 },
  // Assistant 16: ink 229.7×14.7 at x42.7 / y254.7 (1px side bearing).
  choose: { x: 42.5, y: 249.2, w: 330, h: 24, size: 16 },

  // 327×93 cards, 19 apart, 11.5 radius, 2px burgundy hairline (the design
  // border is 6 design px = 2 app px on both cards); the fill is a 47% white
  // veil over the page wash (measured inside vs outside the card).
  cardEmail: {
    x: 42, y: 285, w: 327, h: 93, r: 11.5, line: 'soft',
    // Text block measured per card: the phone card sits 3.4px higher and has
    // a 1px higher description, so these can't be shared.
    titleY: 18.2, descY: 41.3,
  },
  cardPhone: {
    x: 42, y: 397, w: 327, h: 93, r: 11.5, line: 'strong',
    titleY: 14.8, descY: 41.3,
  },

  card: {
    // Icons keep the padded source crop so the artwork lands at its design
    // position: email crop 64..121 × 303..358, phone crop 71..117 × 420..466
    // (both are 1x coordinates with a 3px transparent feather).
    iconEmail: { x: 20, y: 16, w: 57, h: 55 },
    iconPhone: { x: 27, y: 21, w: 46, h: 46 },
    // Text column: ink x141.3, title ink y307.7 (email) / 416.3 (phone),
    // description ink 333 (email) / 444 (phone) with a 190px measure (which is
    // why the phone copy wraps before "your").
    textX: 96.8,
    titleSize: 19,
    titleLineH: 22.8,
    descW: 190,
    descSize: 14,
    descLineH: 18,
    border: 2,
  },

  // Design ink 42..141.7 × 539..580 (99.7×41, radius 5). The pressable keeps
  // the 44px touch minimum centred on the same middle (559.5).
  check: { x: 42, y: 537.5, w: 99.7, h: 44, size: 18, r: 5 },

  // Full-width watercolour + chick/bunny art cropped from the design (y600).
  art: { x: 0, y: 600, w: 412, h: 317 },
};
