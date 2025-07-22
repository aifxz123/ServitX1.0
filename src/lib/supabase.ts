import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Garage {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  subscription_status: 'active' | 'inactive' | 'cancelled'
  subscription_id?: string
  created_at: string
  updated_at: string
}

export interface ServiceRecord {
  id: string
  garage_id: string
  vehicle_registration: string
  service_date: string
  mileage?: number
  service_type: string
  notes?: string
  technician_name?: string
  created_at: string
  updated_at: string
  garages?: Garage
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}

// Service types
export const SERVICE_TYPES = [
  'Full Service',
  'Interim Service',
  'Oil Change',
  'Tyre Change',
  'MOT Prep',
  'Brake Replacement'
] as const

export type ServiceType = typeof SERVICE_TYPES[number]