import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Service {
  id: string
  slug: string
  title: string
  category: 'AUTONOMOS' | 'SOCIEDADES' | 'LABORAL' | 'TRIMESTRES'
  summary: string
  price_note: string
  is_published: boolean
  created_at: string
}

export interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  services_slugs: string[]
  services_titles: string[]
  notes?: string
}

export interface CartItem {
  slug: string
  title: string
  category: string
}