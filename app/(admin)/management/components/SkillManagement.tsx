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

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const {
    skills = [],
    loading,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkill();

  const isLoading = loading;

  const totalPages = Math.ceil(skills.length / pageSize);

  const currentData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return skills.slice(start, start + pageSize);
  }, [skills, page]);

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("profile_id", "1");
    formData.append("name", "New Skill");
    createSkill(formData);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill({
      id: skill.id,
      name: skill.name,
      image: skill.image,
      file: null,
    });
  };

  const handleFileChange = (file: File | null) => {
    if (!editingSkill || !file) return;

    setEditingSkill({
      ...editingSkill,
      file,
      image: URL.createObjectURL(file),
    });
  };

  const handleSave = () => {
    if (!editingSkill?.id) return;

    const formData = new FormData();
    formData.append("name", editingSkill.name);
    formData.append("_method", "PUT");

    if (editingSkill.file) {
      formData.append("image", editingSkill.file);
    }

    updateSkill({
      id: editingSkill.id,
      data: formData,
    });

    setEditingSkill(null);
  };

  const handleDelete = (id: number) => {
    deleteSkill(id);
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
          className={`flex items-center gap-2 rounded-2xl px-5 py-2 shadow transition ${
            editMode
              ? "bg-white text-pink-500"
              : "bg-pink-400 text-white hover:bg-pink-500"
          }`}
        >
          <Pencil size={18} />
          {editMode ? "Close Edit" : "Edit Skills"}
        </button>
      </div>

      <div className="px-8 pb-8 pt-16">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-[#6d4b59]">Skills</h2>

          {editMode && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-2xl bg-pink-400 px-5 py-2 text-white shadow hover:bg-pink-500"
            >
              <Plus size={18} />
              Add Skill
            </button>
          )}
        </div>

        {isLoading && <LoadingSpinner />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {currentData.map((skill: Skill) => (
            <div
              key={skill.id}
              className="relative bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="h-40 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center relative">
                <img
                  src={
                    editingSkill?.id === skill.id
                      ? editingSkill.image
                      : skill.image
                  }
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />

                {editingSkill?.id === skill.id && (
                  <label className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow hover:bg-pink-50 cursor-pointer">
                    <Upload size={18} className="text-pink-400" />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                )}
              </div>

              <div className="p-5 space-y-3">
                {editingSkill?.id === skill.id ? (
                  <input
                    value={editingSkill.name}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-pink-200 px-4 py-2 rounded-xl outline-none focus:border-pink-400"
                  />
                ) : (
                  <h3 className="font-bold text-lg text-[#6d4b59]">
                    {skill.name}
                  </h3>
                )}

                {editMode && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    {editingSkill?.id === skill.id ? (
                      <button
                        onClick={handleSave}
                        className="bg-white p-2 rounded-full shadow hover:bg-green-50"
                      >
                        <Check size={18} className="text-green-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(skill)}
                        className="bg-white p-2 rounded-full shadow hover:bg-blue-50"
                      >
                        <Pencil size={18} className="text-blue-400" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-red-50"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isLoading && skills.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-xl bg-pink-400 text-white disabled:opacity-40"
            >
              Previous
            </button>

            <span className="font-semibold text-[#6d4b59]">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-xl bg-pink-400 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
