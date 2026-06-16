"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { Project } from "@/types";
import { toast } from "react-hot-toast";

export default function useProject(page: number = 1) {
  const queryClient = useQueryClient();

  const projectQuery = useQuery({
    queryKey: ["projects", page],
    queryFn: () => projectService.getProjects(page),
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: projectService.sendProject,

    onMutate: () => {
      const id = toast.loading("Creating project...");
      return { toastId: id };
    },

    onSuccess: (_, __, ctx) => {
      toast.success("Project created!", {
        id: ctx?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },

    onError: (err: any, __, ctx) => {
      toast.error(err?.message || "Create failed", {
        id: ctx?.toastId,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      projectService.updateProject(id, data),

    onMutate: () => {
      const id = toast.loading("Updating project...");
      return { toastId: id };
    },

    onSuccess: (_, __, ctx) => {
      toast.success("Project updated!", {
        id: ctx?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },

    onError: (err: any, __, ctx) => {
      toast.error(err?.message || "Update failed", {
        id: ctx?.toastId,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),

    onMutate: () => {
      const id = toast.loading("Deleting project...");
      return { toastId: id };
    },

    onSuccess: (_, __, ctx) => {
      toast.success("Project deleted!", {
        id: ctx?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },

    onError: (err: any, __, ctx) => {
      toast.error(err?.message || "Delete failed", {
        id: ctx?.toastId,
      });
    },
  });

  return {
    projects: (projectQuery.data?.data as Project[]) ?? [],
    meta: projectQuery.data?.meta ?? null,

    loading: projectQuery.isLoading,
    error: projectQuery.error,

    refetch: projectQuery.refetch,

    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,

 createLoading: createMutation.isPending,
  updateLoading: updateMutation.isPending,
  deleteLoading: deleteMutation.isPending,
  };
}