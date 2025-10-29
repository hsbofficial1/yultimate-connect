import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Tournament {
  id: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  status: 'draft' | 'registration_open' | 'in_progress' | 'completed';
  max_teams: number;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useTournaments = (includeAll = false) => {
  return useQuery({
    queryKey: ['tournaments', includeAll],
    queryFn: async () => {
      let query = supabase
        .from('tournaments')
        .select('*')
        .order('start_date', { ascending: false });

      if (!includeAll) {
        query = query.neq('status', 'draft');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Tournament[];
    },
  });
};

export const useTournament = (id: string) => {
  return useQuery({
    queryKey: ['tournament', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Tournament;
    },
    enabled: !!id,
  });
};

export const useCreateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tournament: Omit<Tournament, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tournaments')
        .insert([{ ...tournament, created_by: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast.success('Tournament created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create tournament');
    },
  });
};

export const useUpdateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Tournament> & { id: string }) => {
      const { data, error } = await supabase
        .from('tournaments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      toast.success('Tournament updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update tournament');
    },
  });
};
