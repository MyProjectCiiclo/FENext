"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Edit3,
} from "lucide-react";
import { Education } from "@/types/education.type";

type EducationField =
  | "school"
  | "degree"
  | "major"
  | "start_date"
  | "end_date"
  | "description";

type Props = {
  eduItem: Education;
  isEditing: boolean;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;

  editData: Partial<Record<EducationField, string>>;

  onChange: (id: number, field: EducationField, value: string) => void;
  onSave: (id: number) => Promise<any> | void;

  onDeleteEducation: (id: number) => void;

  newCourseValue: Record<number, string>;
  setNewCourseValue: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;

  onAddCourse: (id: number) => void;
  onUpdateCourse: (eduId: number, courseId: number, name: string) => void;
  onDeleteCourse: (eduId: number, courseId: number) => void;
};

const EducationCard = React.memo(function EducationCard({
  eduItem,
  isEditing,
  setEditId,
  editData,
  onChange,
  onSave,
  onDeleteEducation,
  newCourseValue,
  setNewCourseValue,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
}: Props) {
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseName, setCourseName] = useState("");
  const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);
  const [deleteEduConfirm, setDeleteEduConfirm] = useState(false);
  useEffect(() => {
    setEditingCourseId(null);
    setCourseName("");
  }, [eduItem.id]);

  const getValue = (field: EducationField) => {
    return editData?.[field] ?? eduItem[field];
  };

  const handleSave = async () => {
    await onSave(eduItem.id);
    setEditId(null);
  };

  const courses = eduItem.courses ?? [];

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-lg">
      <div className="absolute top-10 left-6 w-20 h-20 rounded-[32px] bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center z-10">
        <GraduationCap className="text-pink-500" size={36} />
      </div>

      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300 rounded-t-3xl">
        <div className="absolute top-5 right-5 flex gap-3">
          <button
            onClick={() => setEditId(isEditing ? null : eduItem.id)}
            className="px-4 py-2 rounded-2xl bg-white/20 text-white flex items-center gap-2"
          >
            <Pencil size={16} />
            {isEditing ? "Close" : "Edit"}
          </button>

          {isEditing && (
            <button
              onClick={() => setDeleteEduConfirm(true)}
              className="px-4 py-2 rounded-2xl bg-red-500/70 text-white flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="px-8 pb-8 pt-1">
        {isEditing ? (
          <input
            value={getValue("school") || ""}
            onChange={(e) => onChange(eduItem.id, "school", e.target.value)}
            className="mt-6 w-full text-3xl font-bold border-2 border-pink-300 rounded-2xl px-4 py-3"
          />
        ) : (
          <h2 className="mt-6 text-3xl font-bold">{eduItem.school}</h2>
        )}

        {isEditing ? (
          <input
            value={getValue("major") || ""}
            onChange={(e) => onChange(eduItem.id, "major", e.target.value)}
            className="mt-3 w-full text-pink-500 font-semibold border-2 border-pink-300 rounded-2xl px-4 py-3"
          />
        ) : (
          <p className="mt-3 text-pink-500 font-semibold">{eduItem.major}</p>
        )}

        {isEditing ? (
          <textarea
            value={getValue("description") || ""}
            onChange={(e) =>
              onChange(eduItem.id, "description", e.target.value)
            }
            className="mt-6 w-full border-2 border-pink-300 rounded-2xl p-4"
          />
        ) : (
          <p className="mt-6 text-gray-700">{eduItem.description}</p>
        )}

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Courses</h3>

          <div className="flex flex-wrap gap-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50"
              >
                {editingCourseId === course.id ? (
                  <input
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  <span>{course.name}</span>
                )}

                {isEditing && (
                  <button
                    onClick={() => {
                      setEditingCourseId(course.id);
                      setCourseName(course.name);
                    }}
                  >
                    <Edit3 size={14} />
                  </button>
                )}

                {editingCourseId === course.id && (
                  <button
                    onClick={() => {
                      onUpdateCourse(eduItem.id, course.id, courseName);
                      setEditingCourseId(null);
                    }}
                  >
                    <Save size={14} />
                  </button>
                )}

                {isEditing && (
                  <button onClick={() => setDeleteCourseId(course.id)}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-4">
              <input
                value={newCourseValue[eduItem.id] || ""}
                onChange={(e) =>
                  setNewCourseValue((prev) => ({
                    ...prev,
                    [eduItem.id]: e.target.value,
                  }))
                }
                className="flex-1 border-2 border-pink-300 rounded-2xl px-4 py-3"
              />

              <button
                onClick={() => onAddCourse(eduItem.id)}
                className="bg-pink-500 text-white px-5 rounded-2xl"
              >
                <Plus size={18} />
              </button>
            </div>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {deleteCourseId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[320px] shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Delete this course?</h2>

            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteCourseId(null)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDeleteCourse(eduItem.id, deleteCourseId);
                  setDeleteCourseId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteEduConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[340px] shadow-xl">
            <h2 className="text-lg font-semibold mb-2">
              Delete this education?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              All courses inside will also be removed. This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteEduConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDeleteEducation(eduItem.id);
                  setDeleteEduConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default EducationCard;
