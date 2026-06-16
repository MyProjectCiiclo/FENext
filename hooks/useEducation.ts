"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { EducationService } from "@/services";
import { Education, UpdateEducationDTO } from "@/types";
import toast from "react-hot-toast";

export function useEducation() {
  const queryClient = useQueryClient();

  const query = useQuery<Education[]>({
    queryKey: ["education"],
    queryFn: async () => {
      const res = await EducationService.getEdu();
      return res.data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const createEdu = useMutation({
    mutationFn: async (data: UpdateEducationDTO) => {
      const res = await EducationService.sendEdu(data);
      return res.data as Education;
    },

    onMutate: () => {
      toast.loading("Creating education...", { id: "create-edu" });
    },

    onSuccess: (newItem) => {
      queryClient.setQueryData<Education[]>(["education"], (old = []) => [
        ...old,
        newItem,
      ]);

      toast.success("Education created successfully", {
        id: "create-edu",
      });
    },

    onError: () => {
      toast.error("Create failed", { id: "create-edu" });
    },
  });

  const updateEdu = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateEducationDTO;
    }) => {
      const res = await EducationService.updateEdu(id, data);
      return res.data as Education;
    },

    onMutate: async ({ id, data }) => {
      toast.loading("Updating education...", { id: "update-edu" });

      await queryClient.cancelQueries({ queryKey: ["education"] });

      const prev = queryClient.getQueryData<Education[]>(["education"]);

      queryClient.setQueryData<Education[]>(["education"], (old = []) =>
        old.map((item) =>
          item.id === id ? { ...item, ...data } : item
        )
      );

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["education"], context?.prev);
      toast.error("Update failed", { id: "update-edu" });
    },

    onSuccess: () => {
      toast.success("Education updated successfully", {
        id: "update-edu",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  const deleteEdu = useMutation({
    mutationFn: async (id: number) => {
      await EducationService.deleteEdu(id);
      return id;
    },

    onMutate: async (id) => {
      toast.loading("Deleting education...", { id: "delete-edu" });

      await queryClient.cancelQueries({ queryKey: ["education"] });

      const prev = queryClient.getQueryData<Education[]>(["education"]);

      queryClient.setQueryData<Education[]>(["education"], (old = []) =>
        old.filter((item) => item.id !== id)
      );

      return { prev };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["education"], context?.prev);
      toast.error("Delete failed", { id: "delete-edu" });
    },

    onSuccess: () => {
      toast.success("Education deleted successfully", {
        id: "delete-edu",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  return {
    edu: query.data ?? [],
    loading: query.isLoading,
    error: query.error,

    createEdu: createEdu.mutateAsync,
    updateEdu: updateEdu.mutateAsync,
    deleteEdu: deleteEdu.mutateAsync,

    isCreating: createEdu.isPending,
    isUpdating: updateEdu.isPending,
    isDeleting: deleteEdu.isPending,
  };
}