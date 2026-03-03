export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: string;
          duration_hours: number;
          image_url: string | null;
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price: string;
          duration_hours: number;
          image_url?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price?: string;
          duration_hours?: number;
          image_url?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      images: {
        Row: {
          id: string;
          alt_text: string;
          image_url: string;
          section: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          alt_text: string;
          image_url: string;
          section: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          alt_text?: string;
          image_url?: string;
          section?: string;
          order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      meta: {
        Row: {
          id: string;
          title_default: string | null;
          title_template: string | null;
          description: string | null;
          keywords: Json | null;
          authors: Json | null;
          creator: string | null;
          publisher: string | null;
          og_title: string | null;
          og_description: string | null;
          og_url: string | null;
          og_site_name: string | null;
          og_images: Json | null;
          og_locale: string | null;
          og_type: string | null;
          robots_index: boolean | null;
          robots_follow: boolean | null;
          googlebot: Json | null;
          yandex_verification: string | null;
          manifest: string | null;
          canonical_url: string | null;
          twitter_card: string | null;
          twitter_title: string | null;
          twitter_description: string | null;
          twitter_images: Json | null;
          json_ld: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title_default?: string | null;
          title_template?: string | null;
          description?: string | null;
          keywords?: Json | null;
          authors?: Json | null;
          creator?: string | null;
          publisher?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_url?: string | null;
          og_site_name?: string | null;
          og_images?: Json | null;
          og_locale?: string | null;
          og_type?: string | null;
          robots_index?: boolean | null;
          robots_follow?: boolean | null;
          googlebot?: Json | null;
          yandex_verification?: string | null;
          manifest?: string | null;
          canonical_url?: string | null;
          twitter_card?: string | null;
          twitter_title?: string | null;
          twitter_description?: string | null;
          twitter_images?: Json | null;
          json_ld?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title_default?: string | null;
          title_template?: string | null;
          description?: string | null;
          keywords?: Json | null;
          authors?: Json | null;
          creator?: string | null;
          publisher?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_url?: string | null;
          og_site_name?: string | null;
          og_images?: Json | null;
          og_locale?: string | null;
          og_type?: string | null;
          robots_index?: boolean | null;
          robots_follow?: boolean | null;
          googlebot?: Json | null;
          yandex_verification?: string | null;
          manifest?: string | null;
          canonical_url?: string | null;
          twitter_card?: string | null;
          twitter_title?: string | null;
          twitter_description?: string | null;
          twitter_images?: Json | null;
          json_ld?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          banner_image: string;
          meta_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          banner_image: string;
          meta_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          banner_image?: string;
          meta_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_sections: {
        Row: {
          id: string;
          post_id: string;
          title: string;
          text: string;
          image: string | null;
          order: number;
        };
        Insert: {
          id?: string;
          post_id: string;
          title: string;
          text: string;
          image?: string | null;
          order: number;
        };
        Update: {
          id?: string;
          post_id?: string;
          title?: string;
          text?: string;
          image?: string | null;
          order?: number;
        };
      };
      site_settings: {
        Row: {
          id: string;
          hero_title: string;
          hero_subtitle: string;
          background_gif_url: string | null;
          created_at: string;
          updated_at: string;
          meta_id: string | null;
        };
        Insert: {
          id?: string;
          hero_title: string;
          hero_subtitle: string;
          background_gif_url?: string | null;
          created_at?: string;
          updated_at?: string;
          meta_id?: string | null;
        };
        Update: {
          id?: string;
          hero_title?: string;
          hero_subtitle?: string;
          background_gif_url?: string | null;
          created_at?: string;
          updated_at?: string;
          meta_id?: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: "admin" | "user";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: "admin" | "user";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "admin" | "user";
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: "admin" | "user";
    };
  };
}
