"use client";

import React from "react";
import { GraduationCap, Pencil, Trash2, Plus, X, Save } from "lucide-react";
import { Education } from "@/types";

type Props = {
  eduItem: Education;
  isEditing: boolean;
  onChange: (
    id: number,
    field: Exclude<keyof Education, "courses">,
    value: string,
  ) => void;
  onDeleteEducation: (id: number) => void;
  onAddCourse: (id: number) => void;
  onDeleteCourse: (eduId: number, courseId: number) => void;
  onSave: (id: number) => void;
  newCourseValue: string;
  setNewCourseValue: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
};

const EducationCard = React.memo(function EducationCard({
  eduItem,
  isEditing,
  onChange,
  onDeleteEducation,
  onAddCourse,
  onDeleteCourse,
  onSave,
  newCourseValue,
  setNewCourseValue,
  setEditId,
}: Props) {
  return (
    <section className="bg-white rounded-[32px] border border-pink-100 shadow-lg overflow-hidden">
      {/* HEADER */}
      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
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
              onClick={() => onDeleteEducation(eduItem.id)}
              className="px-4 py-2 rounded-2xl bg-red-500/70 text-white flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* ICON */}
        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <GraduationCap className="text-pink-500" size={36} />
        </div>

        {/* SCHOOL */}
        {isEditing ? (
          <input
            value={eduItem.school ?? ""}
            onChange={(e) => onChange(eduItem.id, "school", e.target.value)}
            className="mt-6 w-full text-3xl font-bold border-2 border-pink-300 rounded-2xl px-4 py-3"
          />
        ) : (
          <h2 className="mt-6 text-3xl font-bold">{eduItem.school}</h2>
        )}

        {/* MAJOR */}
        {isEditing ? (
          <input
            value={eduItem.major ?? ""}
            onChange={(e) => onChange(eduItem.id, "major", e.target.value)}
            className="mt-3 w-full text-pink-500 font-semibold border-2 border-pink-300 rounded-2xl px-4 py-3"
          />
        ) : (
          <p className="mt-3 text-pink-500 font-semibold">{eduItem.major}</p>
        )}

        {/* DESCRIPTION */}
        {isEditing ? (
          <textarea
            value={eduItem.description ?? ""}
            onChange={(e) =>
              onChange(eduItem.id, "description", e.target.value)
            }
            className="mt-6 w-full border-2 border-pink-300 rounded-2xl p-4"
          />
        ) : (
          <p className="mt-6 text-gray-700">{eduItem.description}</p>
        )}

        {/* COURSES */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Courses</h3>

          <div className="flex flex-wrap gap-3">
            {eduItem.courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50"
              >
                {course.name}

                {isEditing && (
                  <button onClick={() => onDeleteCourse(eduItem.id, course.id)}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ADD COURSE */}
          {isEditing && (
            <div className="flex gap-3 mt-4">
              <input
                value={newCourseValue ?? ""}
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

          {/* SAVE */}
          {isEditing && (
            <button
              onClick={() => onSave(eduItem.id)}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default EducationCard;
