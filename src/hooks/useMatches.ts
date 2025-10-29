import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Match {
  id: string;
  tournament_id: string;
  team_a_id: string;
  team_b_id: string;
  field: string;
  scheduled_time: string;
  team_a_score: number;
  team_b_score: number;
  status: 'upcoming' | 'live' | 'completed';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useMatches = (tournamentId?: string) => {
  return useQuery({
    queryKey: ['matches', tournamentId],
    queryFn: async () => {
      let query = supabase
        .from('matches')
        .select(`
          *,
          team_a:teams!matches_team_a_id_fkey(id, name),
          team_b:teams!matches_team_b_id_fkey(id, name)
        `);
      
      if (tournamentId) {
        query = query.eq('tournament_id', tournamentId);
      }

      const { data, error } = await query.order('scheduled_time', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateMatchScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, team_a_score, team_b_score, status }: { id: string; team_a_score?: number; team_b_score?: number; status?: 'upcoming' | 'live' | 'completed' }) => {
      const updates: any = {};
      if (team_a_score !== undefined) updates.team_a_score = team_a_score;
      if (team_b_score !== undefined) updates.team_b_score = team_b_score;
      if (status) updates.status = status;

      const { data, error } = await supabase
        .from('matches')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update score');
    },
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (match: Omit<Match, 'id' | 'created_at' | 'updated_at' | 'team_a_score' | 'team_b_score' | 'status'>) => {
      const { data, error } = await supabase
        .from('matches')
        .insert([match])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast.success('Match created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create match');
    },
  });
};
