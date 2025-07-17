import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton instance for client-side
let clientInstance: SupabaseClient<Database> | null = null

// Client-side Supabase client (singleton)
export const createClientComponentClient = () => {
  if (!clientInstance) {
    clientInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return clientInstance
}

// Export the singleton instance
export const supabase = createClientComponentClient()

// Server-side Supabase client for API routes
export const createServerComponentClient = () => {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}