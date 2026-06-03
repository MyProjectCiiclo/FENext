"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cvService } from "@/services";
import toast from "react-hot-toast";

export function useCv() {
  const queryClient = useQueryClient();

  // GET CV
  const query = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const res = await cvService.getCv();
      return res?.data?.data ?? [];
    },
  });

  // CREATE CV
  const createCv = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("cv", file);
      return cvService.sendCv(formData);
    },
    onSuccess: () => {
      toast.success("Upload CV success 🎉");
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },
    onError: (err: any) => {
      console.log(err?.response?.data);
      toast.error("Upload CV failed");
    },
  });

  // DELETE CV
  const deleteCv = useMutation({
    mutationFn: (id: number) => cvService.deleteCv(id),
    onSuccess: () => {
      toast.success("Delete CV success 🗑️");
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },
    onError: (err: any) => {
      console.log(err?.response?.data);
      toast.error("Delete CV failed");
    },
  });

  return {
    cv: query.data ?? [],
    loading: query.isLoading,

    createCv: createCv.mutateAsync,
    deleteCv: deleteCv.mutateAsync,
  };
}