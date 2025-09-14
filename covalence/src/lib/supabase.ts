import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'admin' | 'manager' | 'analyst' | 'intern'

export interface User {
  id: string
  email: string
  role: UserRole
  full_name: string
  created_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  message: string
  response: string
  response_type: 'table' | 'chart' | 'summary' | 'image' | 'text'
  response_data?: any
  created_at: string
}

export interface Dataset {
  id: string
  name: string
  type: 'csv' | 'pdf' | 'image'
  file_url: string
  metadata?: any
  uploaded_by: string
  created_at: string
}