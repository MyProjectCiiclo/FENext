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

    onSuccess: (newItem) => {
      queryClient.setQueryData<Education[]>(["education"], (old = []) => [
        ...old,
        newItem,
      ]);

      toast.success("Education created successfully");
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
    },

    onSuccess: () => {
      toast.success("Education updated successfully");
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
      await queryClient.cancelQueries({ queryKey: ["education"] });

      const prev = queryClient.getQueryData<Education[]>(["education"]);

      queryClient.setQueryData<Education[]>(["education"], (old = []) =>
        old.filter((item) => item.id !== id)
      );

      return { prev };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["education"], context?.prev);
    },

    onSuccess: () => {
      toast.success("Education deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  return {
    edu: query.data ?? [],
    loading: query.isLoading,
    error: query.error,

    createEdu,
    updateEdu: updateEdu.mutate,
    deleteEdu: deleteEdu.mutate,
  };
}