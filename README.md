# Whatcha Got? 🍽️

> **A practical, budget-friendly meal discovery and planning mobile experience.**  
> Built with Expo Router (React Native) & Supabase.

---

## 🌿 Branch Strategy

This repository is organized into three dedicated branches:

| Branch | Description | Key Directories |
| :--- | :--- | :--- |
| **`main`** | Unified production-ready repository with complete frontend, backend schema, and design specs. | `app/`, `src/`, `supabase/`, `design/`, `assets/` |
| **`frontend`** | Mobile client application focused on UI, screens, state management, and design tokens. | `app/`, `src/components/`, `src/store/`, `src/theme/`, `assets/`, `design/` |
| **`backend`** | Database schema, migrations, RLS policies, seed data, and Supabase integration services. | `supabase/`, `src/lib/`, `src/services/`, `.env.example` |

---

## 📱 Features

- **Smart Meal Discovery:** Filter meals by ingredients on hand, cooking time, mood, and budget.
- **Accessible Design System:** Persistent input labels, high-contrast palette (>= 7.5:1 ratio), action-oriented CTAs.
- **Interactive Grocery List:** Quick-add ingredients directly from recipes, check-off pantry items.
- **Calorie & Goal Tracking:** Daily target gauge, quick food logging, and breakdown.
- **Favorites & Sharing:** Save go-to budget recipes and publish community creations.

---

## 🛠️ Tech Stack

- **Framework:** [Expo](https://expo.dev/) (SDK 58) with [Expo Router](https://docs.expo.dev/router/introduction/) (file-based navigation)
- **UI & Components:** Custom high-contrast accessible component library
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, Storage)
- **Storage Persistence:** `@react-native-async-storage/async-storage`

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project URL and anon public key.

### 3. Start Development Server
```bash
# Start Expo Metro bundler
npm start

# Run on Android
npm run android

# Run in Web browser
npm run web
```

---

## 📂 Project Structure

```
├── app/                  # Expo-router screens & routes
│   ├── _layout.jsx       # Root layout, auth gate & stack
│   ├── index.jsx         # Redirect logic
│   ├── (auth)/           # Onboarding, Welcome, Login, Sign Up, OTP
│   └── (tabs)/           # Home, Calorie, Grocery List, Favorites, Profile
├── src/
│   ├── components/       # UI primitives (Button, Input, Toast) & Feature widgets
│   ├── store/            # Zustand state stores (auth, favorites, grocery, calorie)
│   ├── lib/              # Supabase client initialization
│   ├── services/         # Auth, Recipes, and Storage service layer
│   └── theme/            # Design tokens (colors, typography, spacing, radius)
├── supabase/             # PostgreSQL database schema, RLS policies, and seed data
├── assets/               # App icons, splash, fonts, illustrations
└── design/               # Design tokens guide and screen flow specifications
```

---

## 📄 License
MIT
