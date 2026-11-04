/**
 * OTP verification + error state — rects measured on
 * design/screens/otp-verification.png (1236×2751 = 3×412×917) and
 * otp-error-state.png (the export has a 4px white margin; cropped first).
 * All values are in the 412 x 917 frame.
 *
 * Bands (Figma Y, 1x): bear shadow 94, title ink 254, copy ink 280.3/301.3,
 * boxes 365.3, confirm 512, resend ink 573.7, paws "Hi" 751.3,
 * error dome 545, error text ink 715.7, try-again 787.
 */
export default {
  frame: { w: 412, h: 917 },
  // The asset is 143×153; its opaque ink (alpha>80) is (9,4) 125×133. The
  // design displays it at native size; pixel correlation lands the box at
  // 134/91.7 (its cream body starts at y97.7).
  bear: { x: 134, y: 91.7, w: 143, h: 153 },
  // Fondamento 20: design ink 195×20 at (106, 254); the ink sits 4.3 below
  // the 24 line box, so the box is at 249.7. dx nudges the centred line left
  // for the 1px side bearing Chrome adds around the serif text.
  title: { x: 60, y: 249.7, w: 292, h: 24, size: 20, lines: 1, dx: -1 },
  // Assistant 16 black, 21.4 line box: ink tops 280.3 / 301.3; the copy is
  // centred in a 332-wide column at x39.
  copy: { x: 39, y: 275.9, w: 332, h: 42.8, size: 16, lineH: 21.4 },
  // Five 58×58 boxes: the design's stroke is centred on 365.3..423.3, and CSS
  // draws inside the box, so the frame starts at 365.3 (not 366.3) to land the
  // top and bottom hairlines on the same rows. 17 apart, 14 radius, transparent
  // fill (the page glow shows through) and a soft bottom shadow.
  boxes: { x: 27, y: 365.3, w: 358, h: 58, box: 58, gap: 17, dx: -0.7 },
  // Design fill 159..252 × 513..555 (93×42, radius ~6, #80091B); the label
  // ink starts at 527.3, so the 44-tall touch target starts at 512.
  confirm: { x: 159, y: 512, w: 93, h: 44, size: 18, r: 6 },
  // In the error mock the same button is still painted above the dome, but the
  // export keeps its fill only (no touch target): 159..252 × 513..555.
  ghost: { x: 159, y: 514, w: 93, h: 42, r: 6 },
  // Assistant 16 warm grey: ink 119.3/573.7. The 44-tall pressable starts at
  // 558 so the centred 21.4 line box lands the ink at 573.7.
  resend: { x: 119.3, y: 558, w: 174, h: 44, size: 16, lineH: 21.4 },
  // cat-paw-prints.png is 148×250 with ink (9,137)-(136,249); displayed at
  // native size so "Hi" lands at 191.3/751.3 (the asset is not scaled).
  paws: { x: 131.7, y: 614.3, w: 148, h: 250 },
  // The dome edge fits a 850 circle (top 545.8, centre 206/970.8): it passes
  // x5 y596, x60 y571, x150 y550, x400 y592 — flatter than a 824 circle.
  errorPanel: { x: -219, y: 545.8, w: 850, h: 850, radius: 425 },
  // White Assistant 16 (21.4) two lines, ink top 715.7, centred at x40 w332.
  errorText: { x: 40, y: 710.3, w: 332, h: 42.8, size: 16, lineH: 21.4 },
  // White fill 144..268 × 787..832 (124×45, radius ~10), 18px label.
  errorButton: { x: 144, y: 787, w: 124, h: 45, size: 18, r: 10 },
};
