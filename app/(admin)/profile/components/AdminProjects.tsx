"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Folder, Pencil, Trash2 } from "lucide-react";

import useProject from "@/hooks/useProject";
import { Project } from "@/types";
import LoadingSpinner from "@/shared/Loading";
import ConfirmModalProject from "./ConfirmModalProject";

const ProjectForm = dynamic(() => import("./ProjectForm"), {
  loading: () => <LoadingSpinner />,
});

export default function AdminProjects() {
  const {
    projects,
    loading,
    page,
    meta,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
  } = useProject();

  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  useEffect(() => {
    getProjects(page);
  }, [getProjects, page]);

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

      await getProjects(page);
    } catch (error) {
      console.log("DELETE ERROR:", error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleSave = async (
    data: Project,
    file: File | null
  ) => {
    const formData = new FormData();

    formData.append(
      "project_name",
      data.project_name
    );

    formData.append(
      "description",
      data.description
    );

    formData.append(
      "language",
      Array.isArray(data.language)
        ? data.language.join(",")
        : data.language
    );

    formData.append(
      "project_type",
      data.project_type.join(",")
    );

    if (file) {
      formData.append("image_url", file);
    }

    try {
      if (selectedProject?.id) {
        formData.append("_method", "PUT");

        await updateProject(
          Number(selectedProject.id),
          formData
        );
      } else {
        await createProject(formData);
      }

      await getProjects(page);

      setOpen(false);
    } catch (error) {
      console.log("SAVE ERROR:", error);
    }
  };

  const getImage = (
    img: string | File | null
  ) => {
    if (!img) return "/default-project.png";

    if (img instanceof File) {
      return URL.createObjectURL(img);
    }

    if (
      typeof img === "string" &&
      img.includes("example.com")
    ) {
      return "/default-project.png";
    }

    return img;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <Folder
          className="text-pink-500"
          size={34}
        />
      </div>

      <button
        onClick={() =>
          setEditMode(!editMode)
        }
        className="absolute top-5 right-5 px-5 py-2 rounded-2xl bg-white/20 text-white border border-white/30 flex items-center gap-2 hover:scale-105 transition"
      >
        <Pencil size={18} />

        {editMode
          ? "Close Edit"
          : "Edit Projects"}
      </button>

      <div className="px-8 pb-8 pt-16">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Projects
          </h2>

          <button
            onClick={handleAdd}
            className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600 transition"
          >
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="relative bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="h-44 relative">
                <Image
                  src={getImage(
                    project.image_url
                  )}
                  alt={project.project_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {project.project_name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {project.description}
                </p>

                <p className="text-xs text-pink-500">
                  {project.language}
                </p>

                {editMode && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={() =>
                        handleEdit(project)
                      }
                      className="bg-white/90 p-2 rounded-full shadow hover:scale-105 transition"
                    >
                      <Pencil
                        size={18}
                        className="text-pink-500"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(project.id)
                      }
                      className="bg-white/90 p-2 rounded-full shadow hover:scale-105 transition"
                    >
                      <Trash2
                        size={18}
                        className="text-red-500"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() =>
              getProjects(page - 1)
            }
            className="px-4 py-2 rounded-xl bg-pink-500 text-white disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            Page {meta?.current_page} /{" "}
            {meta?.last_page}
          </span>

          <button
            disabled={
              page === meta?.last_page
            }
            onClick={() =>
              getProjects(page + 1)
            }
            className="px-4 py-2 rounded-xl bg-pink-500 text-white disabled:opacity-50"
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
          title="Delete Project"
          message="Are you sure you want to delete this project?"
          onConfirm={confirmDeleteProject}
          onClose={() =>
            setDeleteId(null)
          }
        />
      </div>
    </section>
  );
}