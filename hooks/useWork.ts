"use client";

import { useQuery } from "@tanstack/react-query";
import { workService } from "@/services";

export function useWork() {
  const query = useQuery({
    queryKey: ["work"],
    queryFn: async () => {
      const res = await workService.getWork();
      return res || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    work: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    getWork: query.refetch,
  };
}