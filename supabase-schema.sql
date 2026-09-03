-- ==============================================================================
-- THE ROYAL CLUB - SUPABASE DATABASE & REALTIME SETUP SCRIPT
-- ==============================================================================
-- Run this in your Supabase Project -> SQL Editor -> Click "Run"
-- This creates the persistent database tables and enables Realtime sync
-- so all changes made in the CEO Command Center reflect instantly on ALL devices.

-- 1. Create live_state table (stores currently active live session)
CREATE TABLE IF NOT EXISTS public.live_state (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  is_live BOOLEAN NOT NULL DEFAULT false,
  current_live JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create schedules table (stores upcoming live broadcasts)
CREATE TABLE IF NOT EXISTS public.schedules (
  id TEXT PRIMARY KEY,
  member_name TEXT NOT NULL,
  member_state TEXT,
  member_image TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT DEFAULT 'Upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create archives table (stores past moments, photos, and live recordings)
CREATE TABLE IF NOT EXISTS public.archives (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  member_name TEXT NOT NULL,
  date TEXT NOT NULL,
  video_url TEXT,
  thumbnail TEXT,
  views TEXT DEFAULT 'Session Highlights',
  media JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.live_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archives ENABLE ROW LEVEL SECURITY;

-- 5. Drop old policies if they exist to avoid duplicate policy errors
DROP POLICY IF EXISTS "Public Read live_state" ON public.live_state;
DROP POLICY IF EXISTS "Public Write live_state" ON public.live_state;
DROP POLICY IF EXISTS "Public Read schedules" ON public.schedules;
DROP POLICY IF EXISTS "Public Write schedules" ON public.schedules;
DROP POLICY IF EXISTS "Public Read archives" ON public.archives;
DROP POLICY IF EXISTS "Public Write archives" ON public.archives;

-- 6. Create Open Read & Write Access Policies
CREATE POLICY "Public Read live_state" ON public.live_state FOR SELECT USING (true);
CREATE POLICY "Public Write live_state" ON public.live_state FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Public Write schedules" ON public.schedules FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read archives" ON public.archives FOR SELECT USING (true);
CREATE POLICY "Public Write archives" ON public.archives FOR ALL USING (true) WITH CHECK (true);

-- 7. Enable Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_state;
ALTER PUBLICATION supabase_realtime ADD TABLE public.schedules;
ALTER PUBLICATION supabase_realtime ADD TABLE public.archives;

-- 8. Seed the default singleton live state row if not present
INSERT INTO public.live_state (id, is_live, current_live)
VALUES ('singleton', false, null)
ON CONFLICT (id) DO NOTHING;
