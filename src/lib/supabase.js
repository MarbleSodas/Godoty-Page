import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbnaymejrngxhpigwphh.supabase.co'
const supabaseAnonKey = 'sb_publishable_crqwAKS-G2fVqkyOTr95lQ_SQu-vaj3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
