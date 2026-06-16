"use client";

import EducationCard from "./EducationCard";
import LoadingSpinner from "@/shared/Loading";
import { useEducation } from "@/hooks/useEducation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Education } from "@/types";
import { useCourseMutation } from '@/hooks';

type EducationField =
  | "school"
  | "degree"
  | "major"
  | "start_date"
  | "end_date"
  | "description";

export default function AdminEducation() {
  const { edu, loading, updateEdu, deleteEdu, createEdu } = useEducation();
  const { createCourse, updateCourse, deleteCourse } = useCourseMutation();

  const [editId, setEditId] = useState<number | null>(null);

  const [editData, setEditData] = useState<
    Record<number, Partial<Record<EducationField, string>>>
  >({});

  const [newCourse, setNewCourse] = useState<Record<number, string>>({});

  const [isCreating, setIsCreating] = useState(false);

  const [newEducation, setNewEducation] = useState({
    school: "",
    degree: "",
    major: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  if (loading) return <LoadingSpinner />;

  const handleChange = (id: number, field: EducationField, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: number) => {
    const data = editData[id];
    if (!data) return;

    const current = edu?.find((e) => e.id === id);

    if (!current) return;

    await updateEdu({
      id,
      data: {
        school: data.school ?? current.school,
        degree: data.degree ?? current.degree,
        major: data.major ?? current.major,
        description: data.description ?? current.description,
        start_date: data.start_date ?? current.start_date,
        end_date: data.end_date ?? current.end_date,
      },
    });

    setEditId(null);
  };

const handleSaveNewEducation = async () => {
  await createEdu(newEducation as any);

  setNewEducation({
    school: "",
    degree: "",
    major: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  setIsCreating(false);
};

  const handleAddCourse = async (eduId: number) => {
    const name = newCourse[eduId];

    if (!name?.trim()) return;

    await createCourse.mutateAsync({
      name,
      education_id: eduId,
    });

    setNewCourse((prev) => ({
      ...prev,
      [eduId]: "",
    }));
  };

  const handleUpdateCourse = async (
    _eduId: number,
    courseId: number,
    name: string,
  ) => {
    await updateCourse.mutateAsync({
      id: courseId,
      data: { name } as any,
    });
  };

  const handleDeleteCourse = async (_eduId: number, courseId: number) => {
    await deleteCourse.mutateAsync(courseId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Education</h2>

        <button
          onClick={() => setIsCreating(true)}
          className="px-5 py-2 bg-pink-500 text-white rounded-2xl flex items-center gap-2"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {isCreating && (
        <div className="mb-10 bg-white p-6 rounded-2xl border shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create Education</h2>

          <input
            placeholder="School"
            value={newEducation.school}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                school: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-3"
          />

          <input
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                degree: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-3"
          />

          <input
            placeholder="Major"
            value={newEducation.major}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                major: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-3"
          />

          <textarea
            placeholder="Description"
            value={newEducation.description}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                description: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-3"
          />

          <input
            type="date"
            value={newEducation.start_date}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                start_date: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-3"
          />

          <input
            type="date"
            value={newEducation.end_date}
            onChange={(e) =>
              setNewEducation((p) => ({
                ...p,
                end_date: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-xl mb-4"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-300 rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveNewEducation}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="space-y-10">
        {edu?.map((eduItem) => (
          <EducationCard
            key={eduItem.id}
            eduItem={eduItem}
            isEditing={editId === eduItem.id}
            setEditId={setEditId}
            editData={editData[eduItem.id] || {}}
            onChange={handleChange}
            onSave={handleSave}
            onDeleteEducation={deleteEdu}
            newCourseValue={newCourse}
            setNewCourseValue={setNewCourse}
            onAddCourse={handleAddCourse}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        ))}
      </div>
    </div>
  );
}
