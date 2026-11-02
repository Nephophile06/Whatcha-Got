# Whatcha Got? — Agent Instructions

## Goal
Build the mobile app **Whatcha Got?** (iOS + Android): a budget-friendly meal discovery, recipe sharing, grocery list and favorites app for students and people living alone. Core idea: reduce decision fatigue, so keep every flow short and every label clear.

Start by implementing the designed screens (listed below) as a pixel-faithful UI, then connect each to Supabase.

## Hard Rules
- JavaScript only. Use `.js` / `.jsx`. NO TypeScript, NO type interfaces.
- Expo (managed workflow) + **expo-router** for navigation. No bare native code, no manual Gradle/CocoaPods edits.
- Styling: **NativeWind** (className). No inline style objects unless NativeWind cannot express it.
- State: **Zustand** only (`src/store/`). No Redux, no Context for global data.
- Backend: **Supabase JS client only** (`src/lib/supabase.js`). No custom server, no other API layer.
- Install only Expo-compatible packages (`npx expo install <pkg>`).
- Never hardcode colors, fonts or spacing in components. Use tokens from `tailwind.config.js` / `src/theme/tokens.js`.
- Do not invent screens, copy or features not in the design. If something is unclear, ask first.

## Working Method
Work in the phases below. **Finish one phase, summarize what changed, and stop for review** before the next. Keep components small and reusable. Prefer simple code over clever code.

## Design Source of Truth
- Assets: `assets/` (see structure below). Always import via the asset registry `src/constants/assets.js`, never with scattered relative paths.
- Design tokens (colors, fonts, radii, spacing): `design/tokens.md`. Mirror them into `tailwind.config.js`.
- Screen references: `design/screens/<screen-name>.png`. Match layout, spacing and copy exactly.

## Project Structure
```
app/                      # expo-router routes
  _layout.jsx             # root layout, font loading, auth gate
  index.jsx               # redirect: onboarding or home
  (auth)/
    onboarding.jsx
    welcome.jsx           # "Login / Sign Up" landing
    create-account.jsx
    account-created.jsx
    login.jsx
    forgot-password.jsx
    otp.jsx               # includes error state
  (tabs)/
    _layout.jsx           # bottom tab bar
    home.jsx
    calorie.jsx
    list.jsx              # grocery list
    favorites.jsx
    profile.jsx
  account-settings.jsx
  share-recipe.jsx
  target-calorie.jsx
src/
  components/
    ui/                   # Button, Input (persistent label), Toast, Card, Chip, Screen
    feature/              # CategoryGrid, EmptyState, OtpInput, TabBar...
  store/                  # authStore.js, favoritesStore.js, groceryStore.js, calorieStore.js
  lib/supabase.js
  services/               # auth.js, recipes.js, storage.js (all Supabase calls live here)
  constants/assets.js     # central asset registry
  theme/tokens.js
assets/
  fonts/  images/  icons/  illustrations/
design/
  tokens.md  screens/
```

## Screens to Implement (from Figma)
1. Onboarding — hero image, title, short copy, "Get Started"
2. Welcome (Login / Sign Up) — background photo, "Sign up", "Already have an account? Login"
3. Create Account — name, email, phone, "Sign up", Google button
4. Account Created — success state
5. Login — username/email, password, "Forgot password?", "Login", Google button
6. Forgot Password — choose recovery method (Email / Phone), "Check"
7. OTP Verification — 5-digit input, "Confirm", resend
8. OTP Error State — same screen, error message + "Try again"
9. Home Loading — splash/skeleton
10. Home Dashboard — "Tell us what you crave" category grid, "Continue" and "Skip for now"
11. Profile — personal info, account settings list, bottom tabs
12. Account Settings — update password, update phone number
13. Share Recipe — image upload, title, recipe name, time, description, submit
14. Share Recipe (upload error) — error toast/banner state
15. Favorites (empty state) — "My Yum List"
16. Target Calorie — daily calorie goal, age/height/weight, estimated guide

## Phases
**Phase 0 — Setup**
Init Expo app (JS template), install NativeWind, Zustand, `@supabase/supabase-js`, expo-router, expo-font, expo-image, expo-image-picker. Configure Tailwind tokens, custom fonts, `.env` (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`). Create `src/lib/supabase.js` and `src/constants/assets.js`.

**Phase 1 — UI Kit**
Build `Screen` (safe area + gradient background), `Button` (primary/secondary/disabled/loading), `Input` (persistent label above field, error text, contrast ≥ WCAG AA), `Toast`, `EmptyState`, `OtpInput`, bottom `TabBar`.

**Phase 2 — Auth UI (static)**
Screens 1–9 with local navigation and mock handlers. Include the OTP error state and form validation states.

**Phase 3 — Home & Tabs (static)**
Home Dashboard category grid (selectable chips, multi-select), tab layout, Profile, Account Settings, Favorites empty state, Target Calorie.

**Phase 4 — Share Recipe (static)**
Form, image picker preview, error banner state.

**Phase 5 — Supabase Auth**
Email/password signup + login, email OTP for password recovery (`signInWithOtp` / `verifyOtp`), session persistence, auth gate in `_layout.jsx`. Phone OTP and Google sign-in are deferred (need external providers / dev build).

**Phase 6 — Data**
Tables: `profiles`, `recipes`, `recipe_ingredients`, `favorites`, `grocery_items`. Enable Row Level Security. Wire Share Recipe (upload to Supabase Storage bucket `recipe-images`), Favorites, calorie goal save.

## Layout & Typography Rules

These rules are mandatory for all future work in this project.

### A1 — Typography policy
- Use `AppText` from `src/components/ui/AppText.jsx` for every piece of text. Do not render raw `<Text>` in screens or components (TextInput internals and nested spans inside AppText are the only exceptions).
- Variants `display` and `heading` use Fondamento and keep their size at all times (`allowFontScaling={false}`). They must never change with the device font setting.
- Variants `body`, `label` and `caption` use Assistant and follow the device font size, capped with `maxFontSizeMultiplier` (body 1.3; label/button/caption 1.2).
- Tab bar labels and OTP digits always use `allowFontScaling={false}`.
- `DEV_FONT_SCALE` in `src/theme/tokens.js` is a dev-only multiplier for Assistant text (1 = device setting only). Leave it at 1 in committed code; change it temporarily to preview 1.3 / 1.5.

### A2 — Responsive "design stage" system
- Design base is **412 × 917 including the status bar**. `StageProvider` (in `src/lib/stage.js`) measures the real edge-to-edge root canvas with `onLayout`; it does not use `Dimensions.get('window')`.
- Read the stage through `useStage()`: `{ W, H, aspect, insets, k, v, u, fx, fy, s }` where `k = W/412`, `v = H/917`, `u = clamp(min(k, v), 0.75, 1.3)`.
  - `fx(n) = n * k` for horizontal offsets; `fy(n) = n * v` for vertical bands and heights that belong to the layout.
  - `s(n) = n * u` for art, icons, radii and spacings that must keep their aspect.
- Cap the stage width at **480** and centre it on tablets/web. Backgrounds, photos, gradients and panels are still full-bleed behind the column.
- Every designed screen reads its rects from `src/layouts/<screen>.js` (x, y, w, h in the 412 × 917 frame). Screen JSX must not contain magic pixel numbers or fixed absolute offsets.
- **R1 — Bands.** Define vertical bands from Figma Y values (e.g. hero 0–405, copy 462–640, CTA 708). Band heights use `fy()`. Anchor each element top/centre/bottom the way the PNG does.
- **R2 — Art.** Images keep their aspect ratio: width `s(figmaWidth)` (height from the same scale). Anchor art to the top/bottom of its band or panel. Never stretch or crop a subject unintentionally.
- **R3 — Absorbing extra height.** Extra or missing height is absorbed only by designated flex gaps between bands (minimum `s(8)`). Text and images are never resized to compensate. If content still cannot fit (short phone + large OS font), the Stage scrolls: its `contentContainerStyle` has `minHeight = H`, so normal phones never scroll.
- `Stage` (from `src/components/ui`) renders the capped column, optional full-bleed `background`, and the scroll fallback. `Stage background` is used for photos and domes that must extend behind the column.
- Tabbed screens (Profile, Account Settings) pass `minHeight={fy(803)}` because the navigator renders the tab bar separately below the stage.
- Bottom-anchored elements add `insets.bottom`; top-anchored content respects `insets.top` while backgrounds still extend behind the bars.
- Never set a fixed height or width on anything containing text. Use `minHeight`, `paddingHorizontal`, `flexShrink: 1`, `maxWidth`.
- Buttons: `minHeight` 44 or larger + horizontal padding; width content or the full column.
- Decorative images set `accessibilityElementsHidden` and `importantForAccessibility="no-hide-descendants"`.

### A3 — Type sizing on the stage
- `AppText` scales Assistant text by `clamp(u, 0.85, 1.2)`; `display` and `heading` (Fondamento) never follow the OS setting.
- Single-line display titles use `numberOfLines` equal to the Figma line count plus `adjustsFontSizeToFit` and `minimumFontScale={0.85}`, so words are never dropped on small phones.
- Dashed/curved panels use one oversized ellipse (width `s(figmaWidth)`, `borderRadius: width/2`, `overflow: 'hidden'`) so Android clips the gradient into the same dome as the PNG.

### A4 — Edge-to-edge system bars
- Backgrounds, gradients and panels extend behind the status bar and the Android navigation bar (no differently coloured strip at the top or bottom). Content respects safe-area insets.
- Set the status bar style per screen with `expo-status-bar` (`dark` icons on light backgrounds, `light` icons on burgundy/dark ones).

### A5 — Dev design overlay
- `src/dev/DesignOverlay.jsx` + `src/dev/designFrames.js` draw the matching design PNG over the running screen at 40% opacity (stretched to the stage) and expose a floating "Design" toggle.
- Enable it with `EXPO_PUBLIC_DESIGN_OVERLAY=1` before `npx expo start`. It is never mounted otherwise and is not part of production UI.

## Known Gaps (deferred by design)
- **Reset password screen** — the OTP success path goes to Home with a TODO; the reset screen is not designed yet.
- **Suggestions/results screen** — Dashboard "continue" and "skip for now" show a "Suggestions coming soon" toast.
- **Phone OTP** — the Forgot Password "Send to Phone" card is visible but disabled (needs an SMS provider / dev build).
- **Google sign-in** — buttons show a "Coming soon" toast (needs a dev build).
- **Legacy routes** — `calorie`, `list`, `favorites`, `share-recipe`, `target-calorie` render the shared `ComingSoonScreen` placeholder until their designs arrive.

## Quality Checklist (apply to every screen)
- Matches the Figma frame at 412×917 and adapts to smaller phones.
- Touch targets ≥ 44×44 px. Text contrast meets WCAG AA.
- Inputs have visible persistent labels (not placeholder-only).
- Buttons use direct action labels ("Save Goal", "Share Recipe"), never vague copy.
- Loading, empty, error and offline states exist where relevant.
- No hardcoded colors or fonts; no unused imports; no console errors.