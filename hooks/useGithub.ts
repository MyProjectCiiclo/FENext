"use client";

import { useQuery } from "@tanstack/react-query";
import { githubService } from "@/services";
import type { GithubContribution, GithubUser } from "@/types";

export function useGithub() {
  const query = useQuery({
    queryKey: ["github"],
    queryFn: async (): Promise<{
      githubUser: GithubUser;
      contributions: GithubContribution;
    }> => {
      const [userRes, contributionRes] = await Promise.all([
        githubService.getGithubUser(),
        githubService.getContributions(),
      ]);

      return {
        githubUser: userRes.data,
        contributions: contributionRes.data,
      };
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    githubUser: query.data?.githubUser ?? null,
    contributions: query.data?.contributions ?? null,
    loading: query.isLoading,
    error: query.error,
  };
}