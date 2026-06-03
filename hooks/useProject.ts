"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { Project } from "@/types";

export default function useProject(page: number = 1) {
  const queryClient = useQueryClient();

  const projectQuery = useQuery({
    queryKey: ["projects", page],
    queryFn: () => projectService.getProjects(page),
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: projectService.sendProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      projectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
  };
}