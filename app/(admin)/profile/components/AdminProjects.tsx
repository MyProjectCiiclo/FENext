"use client";

import { useState } from "react";
import Image from "next/image";
import { Folder, Pencil, Trash2 } from "lucide-react";

import useProject from "@/hooks/useProject";
import { Project } from "@/types";
import LoadingSpinner from "@/shared/Loading";
import ConfirmModalProject from "./ConfirmModalProject";
import ProjectForm from "./ProjectForm";

export default function AdminProjects() {
  const [page, setPage] = useState(1);

  const {
    projects,
    loading,
    meta,
    createProject,
    updateProject,
    deleteProject,
  } = useProject(page);

  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getImage = (img: string | File | null) => {
    if (!img) return "/default-project.png";

    if (img instanceof File) {
      return URL.createObjectURL(img);
    }

    return img;
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject({
      ...project,
      project_type: Array.isArray(project.project_type)
        ? project.project_type
        : project.project_type
          ? (project.project_type as string).split(",")
          : [],
      language: Array.isArray(project.language)
        ? project.language
        : project.language
          ? (project.language as string).split(",")
          : [],
    });

    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDeleteProject = async () => {
    if (!deleteId) return;

    try {
      await deleteProject(deleteId);
    } catch (error) {
      console.log("DELETE ERROR:", error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleSave = async (data: Project, file: File | null) => {
    const formData = new FormData();

    formData.append("project_name", data.project_name ?? "");
    formData.append("description", data.description ?? "");

    formData.append(
      "language",
      Array.isArray(data.language)
        ? data.language.join(",")
        : (data.language ?? ""),
    );

    formData.append(
      "project_type",
      Array.isArray(data.project_type)
        ? data.project_type.join(",")
        : (data.project_type ?? ""),
    );

    if (file) {
      formData.append("image_url", file);
    }

    try {
      if (selectedProject?.id) {
        await updateProject({
          id: Number(selectedProject.id),
          data: formData,
        });
      } else {
        await createProject(formData);
      }

      setOpen(false);
      setSelectedProject(null);
    } catch (error: unknown) {
      console.log("FULL ERROR:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="relative h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 text-white font-bold">
          <Folder />
          Projects
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl"
        >
          <Pencil size={16} />
          {editMode ? "Close" : "Edit"}
        </button>
      </div>

      <div className="px-8 pb-8 pt-6">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold">Projects</h2>

          <button
            onClick={handleAdd}
            className="bg-pink-500 text-white px-5 py-2 rounded-xl"
          >
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="relative bg-white border border-pink-100 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="h-44 relative">
                <Image
                  src={getImage(project.image_url)}
                  alt={project.project_name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="font-bold">{project.project_name}</h3>

                <p className="text-sm text-gray-500">{project.description}</p>

                {editMode && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => handleEdit(project)}>
                      <Pencil size={18} />
                    </button>

                    <button onClick={() => handleDelete(Number(project.id))}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl"
          >
            Previous
          </button>

          <span>
            Page {meta?.current_page} / {meta?.last_page}
          </span>

          <button
            disabled={page === meta?.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl"
          >
            Next
          </button>
        </div>

        {open && (
          <ProjectForm
            initialData={selectedProject}
            onSave={handleSave}
            onClose={() => {
              setOpen(false);
              setSelectedProject(null);
            }}
          />
        )}

        <ConfirmModalProject
          open={deleteId !== null}
          onConfirm={confirmDeleteProject}
          onClose={() => setDeleteId(null)}
        />
      </div>
    </section>
  );
}
