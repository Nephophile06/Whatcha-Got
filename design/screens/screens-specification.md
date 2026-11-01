# Whatcha Got? - Screen Specifications & User Flows

This specification maps the screens and user journeys implemented in `app/`.

---

## 1. Authentication & Onboarding Flow (`app/(auth)/`)

1. **`onboarding.jsx`**:
   - 3-step value carousel highlighting pantry input, budget/time filters, and calorie tracking.
   - Includes visible step indicator and "Skip" / "Get Started" buttons.
2. **`welcome.jsx`**:
   - Brand landing page with direct CTAs: "Log In", "Create an Account", and "Explore as Guest".
3. **`create-account.jsx`**:
   - Form inputs with persistent labels: Full Name, Email, Password, Confirm Password.
   - Field-level validation + error alerts with retry capabilities.
4. **`account-created.jsx`**:
   - Visual confirmation screen with link to OTP verification.
5. **`login.jsx`**:
   - Persistent email and password inputs with forgot password navigation.
6. **`forgot-password.jsx`**:
   - Email entry with persistent label to send 6-digit recovery OTP.
7. **`otp.jsx`**:
   - 6-digit verification input boxes with focus states, error handling, resend timer, and explicit error state support.

---

## 2. Core Discovery & Tabs Flow (`app/(tabs)/`)

1. **`home.jsx`**:
   - Meal discovery driven by 4 key inputs: Ingredients, Time, Mood, Budget.
   - Search input with persistent label, mood selector chips, category grid (`Under 20m`, `Budget`, `Healthy`, `Comfort`, `Veggie`).
   - Recipe card with thumbnail, cooking time, budget estimate, calories, quick add to grocery, and toggle favorite.
   - Zero-results empty state with quick reset action.
2. **`calorie.jsx`**:
   - Hero daily target progress bar showing consumed vs remaining kcal.
   - Quick food log form with title and calorie count.
   - Logged meals timeline with removal action.
3. **`list.jsx`**:
   - Grocery checklist with checkbox toggles and completion strike-through.
   - Inline add ingredient form (item name + quantity).
   - "Clear Checked" bulk action.
4. **`favorites.jsx`**:
   - Saved recipes collection with quick removal and "Add to Grocery List" action.
5. **`profile.jsx`**:
   - User identity banner.
   - Navigation links to `target-calorie.jsx`, `account-settings.jsx`, `share-recipe.jsx`, and sign out.

---

## 3. Modal & Sub-screens (`app/`)

1. **`account-settings.jsx`**:
   - Manage user details and notification / budget alerts switches.
2. **`share-recipe.jsx`**:
   - Modal form with "Share Recipe" CTA.
   - Multi-line ingredient and step-by-step instruction inputs.
3. **`target-calorie.jsx`**:
   - Energy goal screen with "Save Goal" CTA.
   - Preset cards (`Gentle Deficit`, `Maintenance`, `Active & Building`).

