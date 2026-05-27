"use client";

import { useState, useCallback, useEffect } from "react";

import EducationCard from "./EducationCard";

import { useEducation } from "@/hooks/useEducation";
import { useCourse } from "@/hooks/useCourse";

type CourseType = {
  id: number;
  name: string;
};

type EducationType = {
  id: number;
  school: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string | null;
  description: string;
  courses: CourseType[];
};

export default function AdminEducation() {
  const { edu, getEdu, updateEdu, deleteEdu } = useEducation();

  const { createCourse, deleteCourse, updateCourse } = useCourse();

  const [editId, setEditId] = useState<number | null>(null);

  const [localEdu, setLocalEdu] = useState<EducationType[]>([]);

  const [newCourse, setNewCourse] = useState<Record<number, string>>({});

  useEffect(() => {
    getEdu();
  }, []);

  useEffect(() => {
    if (edu) {
      setLocalEdu(edu);
    }
  }, [edu]);

  const handleChange = useCallback(
    (id: number, field: keyof EducationType, value: string) => {
      setLocalEdu((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                [field]: value,
              }
            : item,
        ),
      );
    },
    [],
  );

  const handleDeleteEducation = useCallback(
    async (id: number) => {
      try {
        await deleteEdu(id);

        setLocalEdu((prev) => prev.filter((item) => item.id !== id));

        setEditId(null);
      } catch (err) {
        console.log("DELETE EDUCATION ERROR:", err);
      }
    },
    [deleteEdu],
  );

  const handleAddCourse = useCallback(
    async (eduId: number) => {
      const value = newCourse[eduId];

      if (!value?.trim()) return;

      try {
        console.log("DATA SEND", {
          education_id: eduId,
          name: value,
        });

        const res = await createCourse({
          education_id: eduId,
          name: value,
        });

        console.log("CREATE RES", res);

        setLocalEdu((prev) =>
          prev.map((edu) =>
            edu.id === eduId
              ? {
                  ...edu,
                  courses: [...edu.courses, res],
                }
              : edu,
          ),
        );

        setNewCourse((prev) => ({
          ...prev,
          [eduId]: "",
        }));
      } catch (err) {
        console.log(err);
      }
    },
    [newCourse, createCourse],
  );

  const handleUpdateCourse = useCallback(
    async (eduId: number, courseId: number, name: string) => {
      try {
        const res = await updateCourse(courseId, {
          name,
        } as any);

        setLocalEdu((prev) =>
          prev.map((edu) =>
            edu.id === eduId
              ? {
                  ...edu,
                  courses: edu.courses.map((c) =>
                    c.id === courseId ? res.data : c,
                  ),
                }
              : edu,
          ),
        );
      } catch (err) {
        console.log("UPDATE COURSE ERROR:", err);
      }
    },
    [updateCourse],
  );

  const handleDeleteCourse = useCallback(
    async (eduId: number, courseId: number) => {
      try {
        await deleteCourse(courseId);

        setLocalEdu((prev) =>
          prev.map((edu) =>
            edu.id === eduId
              ? {
                  ...edu,
                  courses: edu.courses.filter((c) => c.id !== courseId),
                }
              : edu,
          ),
        );
      } catch (err) {
        console.log("DELETE COURSE ERROR:", err);
      }
    },
    [deleteCourse],
  );

  const handleSave = useCallback(
    async (id: number) => {
      const data = localEdu.find((item) => item.id === id);

      if (!data) return;

      try {
        await updateEdu(id, {
          school: data.school,
          degree: data.degree,
          major: data.major,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
        });

        setEditId(null);
      } catch (err) {
        console.log("SAVE EDUCATION ERROR:", err);
      }
    },
    [localEdu, updateEdu],
  );

  return (
    <div className="space-y-10">
      {localEdu.map((eduItem) => (
        <EducationCard
          key={eduItem.id}
          eduItem={eduItem}
          isEditing={editId === eduItem.id}
          onChange={handleChange}
          onDeleteEducation={handleDeleteEducation}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
          onSave={handleSave}
          newCourseValue={newCourse[eduItem.id] || ""}
          setNewCourseValue={setNewCourse}
          setEditId={setEditId}
        />
      ))}
    </div>
  );
}
