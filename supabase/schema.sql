-- Whatcha Got? Database Schema (Supabase / PostgreSQL)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    target_calories INTEGER DEFAULT 2000,
    dietary_preferences TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
    ON public.profiles FOR UPDATE
    USING ( auth.uid() = id );

-- 2. Recipes Table
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    time_minutes INTEGER NOT NULL DEFAULT 20,
    budget_tier TEXT NOT NULL DEFAULT '$', -- '$', '$$', '$$$'
    estimated_cost NUMERIC(6, 2) DEFAULT 3.00,
    mood TEXT DEFAULT 'Comforting', -- 'Comforting', 'Healthy', 'Indulgent'
    calories INTEGER DEFAULT 400,
    servings INTEGER DEFAULT 1,
    category TEXT DEFAULT 'Quick & Easy',
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for recipes
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recipes are viewable by everyone."
    ON public.recipes FOR SELECT
    USING ( true );

CREATE POLICY "Authenticated users can create recipes."
    ON public.recipes FOR INSERT
    TO authenticated
    WITH CHECK ( auth.uid() = author_id );

CREATE POLICY "Users can update their own recipes."
    ON public.recipes FOR UPDATE
    TO authenticated
    USING ( auth.uid() = author_id );

CREATE POLICY "Users can delete their own recipes."
    ON public.recipes FOR DELETE
    TO authenticated
    USING ( auth.uid() = author_id );

-- 3. Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, recipe_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites."
    ON public.favorites FOR SELECT
    TO authenticated
    USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own favorites."
    ON public.favorites FOR INSERT
    TO authenticated
    WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own favorites."
    ON public.favorites FOR DELETE
    TO authenticated
    USING ( auth.uid() = user_id );

-- 4. Grocery Items Table
CREATE TABLE IF NOT EXISTS public.grocery_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    quantity TEXT DEFAULT '1',
    category TEXT DEFAULT 'General',
    checked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own grocery list."
    ON public.grocery_items FOR ALL
    TO authenticated
    USING ( auth.uid() = user_id )
    WITH CHECK ( auth.uid() = user_id );

-- 5. Calorie & Meal Logs Table
CREATE TABLE IF NOT EXISTS public.meal_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    calories INTEGER NOT NULL,
    meal_type TEXT DEFAULT 'Meal',
    logged_date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own meal logs."
    ON public.meal_logs FOR ALL
    TO authenticated
    USING ( auth.uid() = user_id )
    WITH CHECK ( auth.uid() = user_id );

