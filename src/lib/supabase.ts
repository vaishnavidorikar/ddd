import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '';
};

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url: string;
          level: number;
          xp: number;
          streak_count: number;
          last_activity_date: string;
          theme_preference: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          level?: number;
          xp?: number;
          streak_count?: number;
          last_activity_date?: string;
          theme_preference?: string;
        };
        Update: {
          name?: string;
          avatar_url?: string;
          level?: number;
          xp?: number;
          streak_count?: number;
          last_activity_date?: string;
          theme_preference?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          difficulty: string;
          total_lessons: number;
          estimated_hours: number;
          image_url: string;
          created_at: string;
        };
      };
      user_courses: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          progress: number;
          lessons_completed: number;
          status: string;
          started_at: string;
          last_accessed: string;
        };
        Insert: {
          user_id: string;
          course_id: string;
          progress?: number;
          lessons_completed?: number;
          status?: string;
        };
        Update: {
          progress?: number;
          lessons_completed?: number;
          status?: string;
          last_accessed?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          category: string;
          requirement_type: string;
          requirement_value: number;
          xp_reward: number;
          rarity: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          earned_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
        };
      };
      daily_goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          target_value: number;
          current_value: number;
          is_completed: boolean;
          xp_reward: number;
          date: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          description: string;
          target_value: number;
          current_value?: number;
          is_completed?: boolean;
          xp_reward: number;
          date?: string;
        };
        Update: {
          current_value?: number;
          is_completed?: boolean;
        };
      };
      daily_challenges: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          difficulty: string;
          xp_reward: number;
          active_date: string;
          created_at: string;
        };
      };
    };
  };
};