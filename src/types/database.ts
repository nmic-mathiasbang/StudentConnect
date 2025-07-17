export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          user_type: 'student' | 'company'
          email: string
          created_at: string
          updated_at: string
          // Student-specific fields
          first_name: string | null
          last_name: string | null
          university: string | null
          major: string | null
          graduation_year: number | null
          skills: string[] | null
          bio: string | null
          portfolio_url: string | null
          linkedin_url: string | null
          github_url: string | null
          // Company-specific fields
          company_name: string | null
          industry: string | null
          company_size: string | null
          website: string | null
          description: string | null
          contact_first_name: string | null
          contact_last_name: string | null
          contact_position: string | null
          headquarters: string | null
          is_verified: boolean | null
          is_profile_complete: boolean
        }
        Insert: {
          id?: string
          user_id: string
          user_type: 'student' | 'company'
          email: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          university?: string | null
          major?: string | null
          graduation_year?: number | null
          skills?: string[] | null
          bio?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          company_name?: string | null
          industry?: string | null
          company_size?: string | null
          website?: string | null
          description?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_position?: string | null
          headquarters?: string | null
          is_verified?: boolean | null
          is_profile_complete?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          user_type?: 'student' | 'company'
          email?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          university?: string | null
          major?: string | null
          graduation_year?: number | null
          skills?: string[] | null
          bio?: string | null
          portfolio_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          company_name?: string | null
          industry?: string | null
          company_size?: string | null
          website?: string | null
          description?: string | null
          contact_first_name?: string | null
          contact_last_name?: string | null
          contact_position?: string | null
          headquarters?: string | null
          is_verified?: boolean | null
          is_profile_complete?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'student' | 'company'
    }
  }
}