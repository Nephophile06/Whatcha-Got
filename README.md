# Whatcha Got? - Frontend Mobile Application 📱

> **Frontend client application built with Expo Router, React Native & Zustand.**

---

## 🎨 Design System & Accessibility

- **High-Contrast Palette:** Built with a minimum 7.5:1 text-to-background contrast ratio (exceeding WCAG AAA).
- **Persistent Input Labels:** All form fields retain explicit visible labels to minimize cognitive fatigue.
- **Action-Oriented CTAs:** Clear action verbs (e.g. `Save Goal`, `Share Recipe`, `Add to Grocery List`).

---

## 📂 Frontend Directory Structure

```
├── app/                  # Expo-Router route tree
│   ├── _layout.jsx       # Root stack, fonts, auth gate
│   ├── index.jsx         # Initial route redirect
│   ├── (auth)/           # Onboarding, Welcome, Create Account, Account Created, Login, Forgot Password, OTP
│   ├── (tabs)/           # Home, Calorie Tracker, Grocery List, Favorites, Profile
│   ├── account-settings.jsx
│   ├── share-recipe.jsx
│   └── target-calorie.jsx
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Input, Card, Chip, Toast, Screen
│   │   └── feature/      # CategoryGrid, EmptyState, OtpInput, TabBar
│   ├── store/            # Zustand stores: authStore, favoritesStore, groceryStore, calorieStore
│   ├── theme/            # tokens.js (colors, typography, spacing, radius, shadows)
│   └── constants/        # assets.js (central asset registry)
├── assets/               # App icons, splash, images, fonts, illustrations
└── design/               # tokens.md, screens-specification.md
```

---

## 🚀 Running the App

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
# Metro bundler
npm start

# Android device / emulator
npm run android

# Web preview
npm run web
```
