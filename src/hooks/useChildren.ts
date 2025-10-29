import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo_url: string | null;
  school_id: string | null;
  community_id: string | null;
  parent_name: string;
  parent_phone: string;
  parent_whatsapp: string | null;
  medical_notes: string | null;
  join_date: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const useChildren = () => {
  return useQuery({
    queryKey: ['children'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .order('name', { ascending: true });
      if (error) throw error;
      return data as Child[];
    },
  });
};

export const useChild = (id: string) => {
  return useQuery({
    queryKey: ['child', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Child;
    },
    enabled: !!id,
  });
};

export const useCreateChild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (child: Omit<Child, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('children')
        .insert([child])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
      toast.success('Child profile created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create child profile');
    },
  });
};

export const useUpdateChild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Child> & { id: string }) => {
      const { data, error } = await supabase
        .from('children')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
      toast.success('Child profile updated!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update child profile');
    },
  });
};
