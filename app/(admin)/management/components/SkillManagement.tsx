"use client";

import { useState, useMemo } from "react";
import { Trash2, Award, Pencil, Plus, Check, Upload } from "lucide-react";
import LoadingSpinner from "@/shared/Loading";
import { useSkill } from "@/hooks/useSkill";
import { Skill } from "@/types";

type EditingSkill = {
  id: number | null;
  name: string;
  image: string;
  file: File | null;
};

export default function SkillManagement() {
  const [editMode, setEditMode] = useState(false);
  const [editingSkill, setEditingSkill] = useState<EditingSkill | null>(null);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    file: null as File | null,
    preview: null as string | null,
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const {
    skills = [],
    loading,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkill();


  const totalPages = Math.ceil(skills.length / pageSize);

  const currentData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return skills.slice(start, start + pageSize);
  }, [skills, page]);

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteSkill(deleteId);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-400 via-pink-300 to-rose-200" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <Award className="text-pink-400" size={34} />
      </div>

      <div className="absolute top-5 right-5 flex gap-3 z-30">
        <button
          onClick={() => setEditMode((v) => !v)}
          className="flex items-center gap-2 rounded-2xl px-5 py-2 bg-pink-400 text-white"
        >
          <Pencil size={18} />
          {editMode ? "Close Edit" : "Edit Skills"}
        </button>
      </div>

      <div className="px-8 pb-8 pt-16">
        <h2 className="text-3xl font-bold text-[#6d4b59]">Skills</h2>

        {loading && <LoadingSpinner />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {currentData.map((skill: Skill) => (
            <div
              key={skill.id}
              className="relative bg-white rounded-2xl border border-pink-100 shadow-sm"
            >
              <div className="relative h-40 flex items-center justify-center bg-pink-50">
                <img
                  src={skill.image}
                  className="w-28 h-28 rounded-full object-cover"
                />

                {editMode && (
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      className="bg-white p-2 rounded-lg shadow"
                    >
                      <Pencil size={18} className="text-blue-400" />
                    </button>

                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="bg-white p-2 rounded-lg shadow"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-[#6d4b59]">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[320px] text-center">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone!
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                OK
              </button>

              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}