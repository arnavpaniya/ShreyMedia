-- ==============================================================================
-- SHREY MEDIA & TECHNOLOGY SOLUTIONS - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- This schema powers the dynamic, real-time Content Management System (CMS).
-- All 13 modules (Business Config, Hero, About, Production Showcase, Services,
-- Testimonials, Case Studies, Outro, Instagram Offers, Bot Config, SEO)
-- are stored and synchronized directly through this table.
-- ==============================================================================

-- 1. Create the main dynamic content table
CREATE TABLE IF NOT EXISTS public.site_data (
    id TEXT PRIMARY KEY,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Policy (Allows anyone visiting shreymedia.in to read published content)
CREATE POLICY "Allow public read access on site_data"
ON public.site_data
FOR SELECT
TO public
USING (true);

-- 4. Create Public Upsert/Update Policy (Allows Admin to update content via PIN authenticated client)
CREATE POLICY "Allow public update access on site_data"
ON public.site_data
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- 5. Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_site_data_updated_at ON public.site_data;
CREATE TRIGGER set_site_data_updated_at
BEFORE UPDATE ON public.site_data
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 6. Insert initial placeholder row if not already present
INSERT INTO public.site_data (id, content)
VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
