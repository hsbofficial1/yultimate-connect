export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      assessments: {
        Row: {
          assessment_date: string
          child_id: string
          cognitive_score: number
          created_at: string
          emotional_score: number
          id: string
          notes: string | null
          physical_score: number
          social_score: number
          total_score: number | null
          type: Database["public"]["Enums"]["assessment_type"]
        }
        Insert: {
          assessment_date: string
          child_id: string
          cognitive_score: number
          created_at?: string
          emotional_score: number
          id?: string
          notes?: string | null
          physical_score: number
          social_score: number
          total_score?: number | null
          type: Database["public"]["Enums"]["assessment_type"]
        }
        Update: {
          assessment_date?: string
          child_id?: string
          cognitive_score?: number
          created_at?: string
          emotional_score?: number
          id?: string
          notes?: string | null
          physical_score?: number
          social_score?: number
          total_score?: number | null
          type?: Database["public"]["Enums"]["assessment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "assessments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          child_id: string
          id: string
          marked_at: string
          present: boolean
          session_id: string
          synced: boolean
        }
        Insert: {
          child_id: string
          id?: string
          marked_at?: string
          present?: boolean
          session_id: string
          synced?: boolean
        }
        Update: {
          child_id?: string
          id?: string
          marked_at?: string
          present?: boolean
          session_id?: string
          synced?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "attendance_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          active: boolean
          age: number
          community_id: string | null
          created_at: string
          gender: string
          id: string
          join_date: string
          medical_notes: string | null
          name: string
          parent_name: string
          parent_phone: string
          parent_whatsapp: string | null
          photo_url: string | null
          school_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          age: number
          community_id?: string | null
          created_at?: string
          gender: string
          id?: string
          join_date?: string
          medical_notes?: string | null
          name: string
          parent_name: string
          parent_phone: string
          parent_whatsapp?: string | null
          photo_url?: string | null
          school_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          age?: number
          community_id?: string | null
          created_at?: string
          gender?: string
          id?: string
          join_date?: string
          medical_notes?: string | null
          name?: string
          parent_name?: string
          parent_phone?: string
          parent_whatsapp?: string | null
          photo_url?: string | null
          school_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "children_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      home_visits: {
        Row: {
          action_items: string | null
          child_id: string
          coach_id: string
          created_at: string
          duration: number | null
          id: string
          notes: string | null
          purpose: string
          visit_date: string
        }
        Insert: {
          action_items?: string | null
          child_id: string
          coach_id: string
          created_at?: string
          duration?: number | null
          id?: string
          notes?: string | null
          purpose: string
          visit_date: string
        }
        Update: {
          action_items?: string | null
          child_id?: string
          coach_id?: string
          created_at?: string
          duration?: number | null
          id?: string
          notes?: string | null
          purpose?: string
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "home_visits_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "home_visits_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          field: string
          id: string
          notes: string | null
          scheduled_time: string
          status: Database["public"]["Enums"]["match_status"]
          team_a_id: string
          team_a_score: number
          team_b_id: string
          team_b_score: number
          tournament_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          field: string
          id?: string
          notes?: string | null
          scheduled_time: string
          status?: Database["public"]["Enums"]["match_status"]
          team_a_id: string
          team_a_score?: number
          team_b_id: string
          team_b_score?: number
          tournament_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          field?: string
          id?: string
          notes?: string | null
          scheduled_time?: string
          status?: Database["public"]["Enums"]["match_status"]
          team_a_id?: string
          team_a_score?: number
          team_b_id?: string
          team_b_score?: number
          tournament_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_team_a_id_fkey"
            columns: ["team_a_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_b_id_fkey"
            columns: ["team_b_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          coach_id: string
          created_at: string
          date: string
          id: string
          location: string
          notes: string | null
          program_type: Database["public"]["Enums"]["program_type"]
          time: string
        }
        Insert: {
          coach_id: string
          created_at?: string
          date: string
          id?: string
          location: string
          notes?: string | null
          program_type: Database["public"]["Enums"]["program_type"]
          time: string
        }
        Update: {
          coach_id?: string
          created_at?: string
          date?: string
          id?: string
          location?: string
          notes?: string | null
          program_type?: Database["public"]["Enums"]["program_type"]
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      spirit_scores: {
        Row: {
          attitude: number
          comments: string | null
          communication: number
          fairness: number
          fouls: number
          from_team_id: string
          id: string
          match_id: string
          rules: number
          submitted_at: string
          to_team_id: string
          total: number | null
        }
        Insert: {
          attitude: number
          comments?: string | null
          communication: number
          fairness: number
          fouls: number
          from_team_id: string
          id?: string
          match_id: string
          rules: number
          submitted_at?: string
          to_team_id: string
          total?: number | null
        }
        Update: {
          attitude?: number
          comments?: string | null
          communication?: number
          fairness?: number
          fouls?: number
          from_team_id?: string
          id?: string
          match_id?: string
          rules?: number
          submitted_at?: string
          to_team_id?: string
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "spirit_scores_from_team_id_fkey"
            columns: ["from_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spirit_scores_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spirit_scores_to_team_id_fkey"
            columns: ["to_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_players: {
        Row: {
          age: number
          created_at: string
          email: string | null
          gender: string
          id: string
          name: string
          team_id: string
        }
        Insert: {
          age: number
          created_at?: string
          email?: string | null
          gender: string
          id?: string
          name: string
          team_id: string
        }
        Update: {
          age?: number
          created_at?: string
          email?: string | null
          gender?: string
          id?: string
          name?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          captain_id: string
          created_at: string
          email: string
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          phone: string
          status: Database["public"]["Enums"]["team_status"]
          tournament_id: string
          updated_at: string
        }
        Insert: {
          captain_id: string
          created_at?: string
          email: string
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          phone: string
          status?: Database["public"]["Enums"]["team_status"]
          tournament_id: string
          updated_at?: string
        }
        Update: {
          captain_id?: string
          created_at?: string
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          phone?: string
          status?: Database["public"]["Enums"]["team_status"]
          tournament_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_captain_id_fkey"
            columns: ["captain_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          id: string
          location: string
          max_teams: number
          name: string
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          id?: string
          location: string
          max_teams?: number
          name: string
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          id?: string
          location?: string
          max_teams?: number
          name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      assessment_type: "baseline" | "midline" | "endline"
      match_status: "upcoming" | "live" | "completed"
      program_type: "school" | "community"
      team_status: "pending" | "approved" | "rejected"
      tournament_status:
        | "draft"
        | "registration_open"
        | "in_progress"
        | "completed"
      user_role:
        | "admin"
        | "tournament_director"
        | "team_captain"
        | "player"
        | "coach"
        | "program_manager"
        | "volunteer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assessment_type: ["baseline", "midline", "endline"],
      match_status: ["upcoming", "live", "completed"],
      program_type: ["school", "community"],
      team_status: ["pending", "approved", "rejected"],
      tournament_status: [
        "draft",
        "registration_open",
        "in_progress",
        "completed",
      ],
      user_role: [
        "admin",
        "tournament_director",
        "team_captain",
        "player",
        "coach",
        "program_manager",
        "volunteer",
      ],
    },
  },
} as const
