import { createClient } from '@supabase/supabase-js';

// Ambil nilai dari environment variable
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validasi ketat: Jika URL kosong, bernilai literal 'undefined'/'null', atau tidak diawali http/https
if (!supabaseUrl || supabaseUrl === 'undefined' || supabaseUrl === 'null' || (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://'))) {
  supabaseUrl = 'https://xwnidjtvxcagctclftqg.supabase.co';
}

// Validasi ketat untuk Anon Key: Jika kosong atau bernilai literal 'undefined'/'null'
if (!supabaseAnonKey || supabaseAnonKey === 'undefined' || supabaseAnonKey === 'null') {
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bmlkanR2eGNhZ2N0Y2xmdHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTk0MjIsImV4cCI6MjA5ODQ5NTQyMn0.4xC2klec6zOwqQWsGw_waE0CnWRcM4-6458qwQ5qrvs';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
