import { createClient } from '@supabase/supabase-js';

// Menggunakan fallback default yang valid agar Vercel build tidak crash saat proses prerendering (build-time)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwnidjtvxcagctclftqg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bmlkanR2eGNhZ2N0Y2xmdHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTk0MjIsImV4cCI6MjA5ODQ5NTQyMn0.4xC2klec6zOwqQWsGw_waE0CnWRcM4-6458qwQ5qrvs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
