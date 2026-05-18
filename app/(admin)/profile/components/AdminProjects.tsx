"use client";

import { useState } from "react";
import Image from "next/image";
import { Folder, Trash, Pencil, X } from "lucide-react";
import ProjectForm from "./ProjectForm";

export type Project = {
  title: string;
  desc: string;
  image: File | string | null;
  tech: string[];
};

export default function AdminProjects() {
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: "E-commerce Website",
      desc: "Full stack shopping website with cart & checkout",
      image: "/assets/project1.png",
      tech: ["Next.js", "Tailwind", "Node.js"],
    },
    {
      title: "Admin Dashboard",
      desc: "Dashboard quản lý user, analytics, CRUD system",
      image: "/assets/project2.png",
      tech: ["React", "Laravel", "MySQL"],
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openAdd = () => {
    setEditingIndex(null);
    setEditingProject(null);
    setShowForm(true);
  };

  const openEdit = (project: Project, index: number) => {
    setEditingIndex(index);
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSave = (data: Project) => {
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = data;
      setProjects(updated);
    } else {
      setProjects([...projects, data]);
    }

    setShowForm(false);
    setEditingIndex(null);
    setEditingProject(null);
  };

  const deleteProject = (index: number) => {
    const ok = window.confirm("Are you sure you want to delete this project?");
    if (!ok) return;

    setProjects(projects.filter((_, i) => i !== index));
  };

  const getImage = (img: File | string | null) => {
    if (!img) return "";
    if (img instanceof File) return URL.createObjectURL(img);
    return img;
  };

  return (
    <section className="bg-white rounded-[32px] overflow-hidden border border-pink-100 shadow-[0_10px_40px_rgba(255,105,180,0.08)]">

      <div className="relative h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
        <button
          onClick={() => setEdit(!edit)}
          className="absolute top-5 right-5 px-5 py-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-2 text-white hover:scale-105 transition"
        >
          <Pencil size={18} />
          {edit ? "Close Edit" : "Edit Projects"}
        </button>
      </div>


      <div className="px-8 pb-8 relative">

        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <Folder className="text-pink-500" size={34} />
        </div>

        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Projects
          </h2>

          {edit && (
            <button
              onClick={openAdd}
              className="px-5 py-2 rounded-2xl bg-pink-500 text-white flex items-center gap-2 hover:scale-105 transition"
            >
              <Folder size={16} />
              Add Project
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm relative"
            >

              <div className="h-44 relative">
                <Image
                  src={getImage(project.image)}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-pink-50 text-pink-600 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {edit && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => openEdit(project, index)}
                    className="p-2 bg-white rounded-lg shadow text-blue-500"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => deleteProject(index)}
                    className="p-2 bg-white rounded-lg shadow text-red-500"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {edit && (
          <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 py-4 text-white font-semibold hover:scale-[1.01] transition">
            Save Changes
          </button>
        )}
      </div>

      {showForm && (
        <ProjectForm
          initialData={editingProject}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}