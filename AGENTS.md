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

## Quality Checklist (apply to every screen)
- Matches the Figma frame at 390×844 and adapts to smaller phones.
- Touch targets ≥ 44×44 px. Text contrast meets WCAG AA.
- Inputs have visible persistent labels (not placeholder-only).
- Buttons use direct action labels ("Save Goal", "Share Recipe"), never vague copy.
- Loading, empty, error and offline states exist where relevant.
- No hardcoded colors or fonts; no unused imports; no console errors.