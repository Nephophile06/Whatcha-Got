# Whatcha Got? - Backend & Database Infrastructure 🗄️

> **Backend services, PostgreSQL database schema, RLS policies, and Supabase integration.**

---

## 🏗️ Architecture Overview

The backend is built on top of **Supabase (PostgreSQL)**, providing managed authentication, database operations with Row Level Security (RLS), and bucket storage for recipe images.

### Key Database Tables

| Table | Purpose | Row Level Security (RLS) |
| :--- | :--- | :--- |
| **`profiles`** | User details, dietary preferences, target daily calories | Public read, user-scoped write/update |
| **`recipes`** | Community & curated meal recipes, ingredients (JSONB), steps | Public read, author-scoped write/update/delete |
| **`favorites`** | User-saved recipe bookmarks | Authenticated user-scoped |
| **`grocery_items`**| Personalized grocery checklist & purchased status | Authenticated user-scoped |
| **`meal_logs`** | Daily consumed calorie entries & meal times | Authenticated user-scoped |

---

## 📂 Backend Directory Structure

```
├── supabase/
│   ├── schema.sql        # Full PostgreSQL DDL schema & Row Level Security policies
│   └── seed.sql          # Seed data for initial budget recipes
├── src/
│   ├── lib/
│   │   └── supabase.js   # Supabase client initialization & session storage
│   └── services/
│       ├── auth.js       # SignUp, SignIn, VerifyOTP, ResetPassword, SignOut
│       ├── recipes.js    # Fetch recipes with filters, recipe details, create recipe
│       ├── storage.js    # Image uploads and deletions
│       └── index.js      # Unified service exports
├── .env.example          # Environment variable template
├── .gitignore
└── package.json
```

---

## 🚀 Supabase Local Setup & Deployment

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase Project URL and Anon Public Key:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 2. Apply Schema via Supabase CLI
```bash
# Initialize Supabase locally
npx supabase init

# Start local Supabase instance (Docker required)
npx supabase start

# Apply schema and seed data
npx supabase db reset
```

Or copy the contents of `supabase/schema.sql` directly into your Supabase Dashboard **SQL Editor** and run.
