import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skwlndaqqkxushqkhlgg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrd2xuZGFxcWt4dXNocWtobGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNTA0OTYsImV4cCI6MjA4MDYyNjQ5Nn0.1d_H4e897JV2szNBMY7lzhicu8Pa0xIcyqm5WgVUedM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
