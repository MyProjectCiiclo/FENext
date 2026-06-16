"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import toast from "react-hot-toast";

export function useSkill() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: skillService.getSkills,
  });

  const createSkill = useMutation({
    mutationFn: skillService.createSkill,

    onMutate: () => {
      const id = toast.loading("Creating skill...");
      return { toastId: id };
    },

    onSuccess: (_, __, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Skill created");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.toastId);
      toast.error("Create skill failed");
    },
  });

  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      skillService.updateSkill(id, data),

    onMutate: () => {
      const id = toast.loading("Updating skill...");
      return { toastId: id };
    },

    onSuccess: (_, __, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Skill updated");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.toastId);
      toast.error("Update failed");
    },
  });

  const deleteSkill = useMutation({
    mutationFn: skillService.deleteSkill,

    onMutate: () => {
      const id = toast.loading("Deleting skill...");
      return { toastId: id };
    },

    onSuccess: (_, __, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Skill deleted");
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.toastId);
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