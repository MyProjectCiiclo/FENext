"use client";

import { useQuery } from "@tanstack/react-query";
import { skillService  } from "@/services";

export function useAbout() {
  const query = useQuery({
    queryKey: ["about"],
    queryFn: skillService .getSkills,
    staleTime: 1000 * 60 * 5,
  });

  return {
    about: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}