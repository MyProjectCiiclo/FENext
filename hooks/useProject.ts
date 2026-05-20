import { projectService } from "@/services";
import { Project } from "@/types";
import { useState, useCallback } from "react";

export default function useProject() {
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const [page, setPage] = useState(1);

  const [meta, setMeta] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null>(null);

  const getProjects = useCallback(async (pageNumber = 1) => {
    setLoading(true);

    try {
      const res = await projectService.getProjects(pageNumber);

      setProjects(res.data);

      setMeta(res.meta);

      setPage(pageNumber);

      console.log("PROJECT RESPONSE:", res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (data: FormData) => {
    setLoading(true);

    try {
      await projectService.sendProject(data);

      await getProjects(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: number, data: FormData) => {
    setLoading(true);

    try {
      await projectService.updateProject(id, data);

      await getProjects(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    setLoading(true);

    try {
      await projectService.deleteProject(id);

      await getProjects(page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    page,
    setPage,
    meta,

    getProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}