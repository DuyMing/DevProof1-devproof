import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LeaderboardEntry {
  id: string;
  name: string;
  username: string;
  university: string;
  github_url: string | null;
  github_username: string | null;
  linkedin_url: string | null;
  features_shipped: number;
  points: number;
  is_founding_member: boolean;
}

export const useLeaderboard = (limit = 6) => {
  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false })
        .order('features_shipped', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data as unknown as LeaderboardEntry[];
    },
  });
};

export const useContributorsCount = () => {
  return useQuery({
    queryKey: ['contributors-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      return count || 0;
    },
  });
};
