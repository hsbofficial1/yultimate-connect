import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Team {
  id: string;
  tournament_id: string;
  name: string;
  captain_id: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  logo_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamPlayer {
  id: string;
  team_id: string;
  name: string;
  age: number;
  gender: string;
  email: string | null;
}

export const useTeams = (tournamentId?: string) => {
  return useQuery({
    queryKey: ['teams', tournamentId],
    queryFn: async () => {
      let query = supabase.from('teams').select('*');
      
      if (tournamentId) {
        query = query.eq('tournament_id', tournamentId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data as Team[];
    },
  });
};

export const useTeamPlayers = (teamId: string) => {
  return useQuery({
    queryKey: ['team-players', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_players')
        .select('*')
        .eq('team_id', teamId);
      if (error) throw error;
      return data as TeamPlayer[];
    },
    enabled: !!teamId,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ team, players }: { team: Omit<Team, 'id' | 'created_at' | 'updated_at' | 'captain_id' | 'status'>; players: Omit<TeamPlayer, 'id' | 'team_id' | 'created_at'>[] }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert([{ ...team, captain_id: user.id }])
        .select()
        .single();

      if (teamError) throw teamError;

      const playersWithTeamId = players.map(p => ({ ...p, team_id: teamData.id }));
      const { error: playersError } = await supabase
        .from('team_players')
        .insert(playersWithTeamId);

      if (playersError) throw playersError;
      return teamData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team registered successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to register team');
    },
  });
};

export const useUpdateTeamStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: 'approved' | 'rejected'; notes?: string }) => {
      const { data, error } = await supabase
        .from('teams')
        .update({ status, notes })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team status updated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update team status');
    },
  });
};
