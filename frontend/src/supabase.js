import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://pllajcekdjquybhesqyr.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGFqY2VrZGpxdXliaGVzcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNTE3NDEsImV4cCI6MjA4NDYyNzc0MX0.wW-lVHf9OrmlXgzniwBxX1J4BzoyZwSsl-E3OwFfxVk";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
