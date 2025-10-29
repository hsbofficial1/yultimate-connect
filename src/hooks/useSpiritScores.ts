import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SpiritScore {
  id: string;
  match_id: string;
  from_team_id: string;
  to_team_id: string;
  rules: number;
  fouls: number;
  fairness: number;
  attitude: number;
  communication: number;
  total: number;
  comments: string | null;
  submitted_at: string;
}

export const useSpiritScores = (tournamentId?: string) => {
  return useQuery({
    queryKey: ['spirit-scores', tournamentId],
    queryFn: async () => {
      let query = supabase
        .from('spirit_scores')
        .select(`
          *,
          match:matches(*),
          from_team:teams!spirit_scores_from_team_id_fkey(id, name),
          to_team:teams!spirit_scores_to_team_id_fkey(id, name)
        `);

      if (tournamentId) {
        query = query.eq('match.tournament_id', tournamentId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useSubmitSpiritScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (score: Omit<SpiritScore, 'id' | 'total' | 'submitted_at'>) => {
      const { data, error } = await supabase
        .from('spirit_scores')
        .insert([score])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spirit-scores'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      toast.success('Spirit score submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit spirit score');
    },
  });
};
