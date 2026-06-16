"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingService } from "@/services";
import { Rating } from "@/types";
import toast from "react-hot-toast";

type CreateRatingDTO = {
  name: string;
  message: string;
};

export function useRating() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["ratings"],
    queryFn: ratingService.getRating,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateRatingDTO) => ratingService.sendRating(data),

    onMutate: () => {
      toast.loading("Sending message...", { id: "ratings" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      toast.success("Thank you for your feedback!", { id: "ratings" });
    },

    onError: () => {
      toast.error("Failed to submit rating", { id: "ratings" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ratingService.deleteRating(id),

    onMutate: () => {
      toast.loading("Deleting loading...", { id: "delete-rating" });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      toast.success("Delete success!", { id: "delete-rating" });
    },

    onError: () => {
      toast.error("Something went wrong", { id: "delete-rating" });
    },
  });

  return {
    ratings: (query.data as Rating[]) ?? [],
    loading: query.isLoading,
    error: query.error,

    getRating: query.refetch,

    createRating: createMutation.mutate,
    deleteRating: deleteMutation.mutate,
  };
}
