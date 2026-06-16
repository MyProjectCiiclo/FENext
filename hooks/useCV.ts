"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cvService } from "@/services";
import toast from "react-hot-toast";

export function useCv() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cv"],
    queryFn: async () => {
      const res = await cvService.getCv();
      return res?.data?.data ?? [];
    },
  });

  const createCv = useMutation({
    mutationFn: async (file: File) => {
      const existing = queryClient.getQueryData<any[]>(["cv"]);

      if (existing && existing.length > 0) {
        throw new Error("CV_EXISTS");
      }

      const formData = new FormData();
      formData.append("cv", file);
      return cvService.sendCv(formData);
    },

    onMutate: () => {
      const toastId = toast.loading("Uploading CV...");
      return { toastId };
    },

    onSuccess: (_data, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Upload CV success 🎉");
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },

    onError: (err: any, _vars, context) => {
      toast.dismiss(context?.toastId);

      if (err?.message === "CV_EXISTS") {
        toast.error("You already have a CV. Please delete it first.");
      } else {
        toast.error("Upload CV failed");
      }
    },
  });

  const deleteCv = useMutation({
    mutationFn: (id: number) => cvService.deleteCv(id),

    onMutate: () => {
      const toastId = toast.loading("Deleting CV...");
      return { toastId };
    },

    onSuccess: (_data, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Delete CV success 🗑️");
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },

    onError: (_err: any, _vars, context) => {
      toast.dismiss(context?.toastId);
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