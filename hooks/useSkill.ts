"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import toast from "react-hot-toast";

export function useSkill() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: skillService.getSkills,
  });

  const createSkill = useMutation({
    mutationFn: skillService.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill created");
    },
    onError: () => {
      toast.error("Create skill failed");
    },
  });

  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      skillService.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated");
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const deleteSkill = useMutation({
    mutationFn: skillService.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted");
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  return {
    skills: data?.data ?? [],
    loading: isLoading,
    createSkill: createSkill.mutate,
    updateSkill: updateSkill.mutate,
    deleteSkill: deleteSkill.mutate,
  };
}