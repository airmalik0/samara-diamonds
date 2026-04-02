export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          address_line2_ru: string
          address_line2_uz: string
          address_ru: string
          address_uz: string
          contact_name: string
          hours_weekday_ru: string
          hours_weekday_uz: string
          hours_weekend_ru: string
          hours_weekend_uz: string
          id: number
          instagram_handle: string
          instagram_url: string
          map_subtitle_ru: string
          map_subtitle_uz: string
          map_url: string
          phone: string
          telegram_label: string
          telegram_url: string
          updated_at: string
        }
        Insert: {
          address_line2_ru?: string
          address_line2_uz?: string
          address_ru?: string
          address_uz?: string
          contact_name?: string
          hours_weekday_ru?: string
          hours_weekday_uz?: string
          hours_weekend_ru?: string
          hours_weekend_uz?: string
          id?: number
          instagram_handle?: string
          instagram_url?: string
          map_subtitle_ru?: string
          map_subtitle_uz?: string
          map_url?: string
          phone?: string
          telegram_label?: string
          telegram_url?: string
          updated_at?: string
        }
        Update: {
          address_line2_ru?: string
          address_line2_uz?: string
          address_ru?: string
          address_uz?: string
          contact_name?: string
          hours_weekday_ru?: string
          hours_weekday_uz?: string
          hours_weekend_ru?: string
          hours_weekend_uz?: string
          id?: number
          instagram_handle?: string
          instagram_url?: string
          map_subtitle_ru?: string
          map_subtitle_uz?: string
          map_url?: string
          phone?: string
          telegram_label?: string
          telegram_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: number
          image_model: string
          image_white: string
          slug: string
          sort_order: number
          subtitle_ru: string
          subtitle_uz: string
          updated_at: string
        }
        Insert: {
          id?: number
          image_model: string
          image_white: string
          slug: string
          sort_order?: number
          subtitle_ru: string
          subtitle_uz: string
          updated_at?: string
        }
        Update: {
          id?: number
          image_model?: string
          image_white?: string
          slug?: string
          sort_order?: number
          subtitle_ru?: string
          subtitle_uz?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
