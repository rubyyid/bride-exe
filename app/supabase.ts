import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  'https://mrxpbqtgwmsasqbcxxjo.supabase.co'

const supabaseAnonKey =
  'sb_publishable_iEp7GvdF7SkZrTpHKryE3w_CNq81QnU'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)