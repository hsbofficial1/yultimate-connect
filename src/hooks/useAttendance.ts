import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Session {
  id: string;
  date: string;
  time: string;
  location: string;
  coach_id: string;
  program_type: 'school' | 'community';
  notes: string | null;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  child_id: string;
  present: boolean;
  marked_at: string;
  synced: boolean;
}

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: false });
      if (error) throw error;
      return data as Session[];
    },
  });
};

export const useSessionAttendance = (sessionId: string) => {
  return useQuery({
    queryKey: ['attendance', sessionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          child:children(*)
        `)
        .eq('session_id', sessionId);
      if (error) throw error;
      return data;
    },
    enabled: !!sessionId,
  });
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (session: Omit<Session, 'id' | 'created_at' | 'coach_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('sessions')
        .insert([{ ...session, coach_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      toast.success('Session created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create session');
    },
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sessionId, attendance }: { sessionId: string; attendance: { child_id: string; present: boolean }[] }) => {
      const records = attendance.map(a => ({
        session_id: sessionId,
        child_id: a.child_id,
        present: a.present,
        synced: true,
      }));

      const { error } = await supabase
        .from('attendance')
        .upsert(records, { onConflict: 'session_id,child_id' });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success('Attendance saved successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to save attendance');
    },
  });
};
