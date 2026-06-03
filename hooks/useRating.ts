"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingService } from "@/services";
import { Rating } from "@/types";
import toast from "react-hot-toast";

export function useRating() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["ratings"],
    queryFn: ratingService.getRating,
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ratingService.deleteRating(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      toast.success("Delete success!");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return {
    ratings: (query.data as Rating[]) ?? [],
    loading: query.isLoading,
    error: query.error,

    getRating: query.refetch,
    deleteRating: deleteMutation.mutateAsync,
  };
}