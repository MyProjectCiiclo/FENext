"use client";

import { useState, useEffect, useCallback } from "react";

import { useEducation } from "@/hooks/useEducation";
import { useCourse } from "./useCourse";
import { Education } from "@/types";

export function useAdminEducation() {
  const { edu, getEdu, updateEdu, deleteEdu } = useEducation();

  const { createCourse, updateCourse, deleteCourse } = useCourse();

  const [editId, setEditId] = useState<number | null>(null);

const [localEdu, setLocalEdu] = useState<Education[]>([]);
  const [newCourse, setNewCourse] = useState<Record<number, string>>({});

  useEffect(() => {
    getEdu();
  }, [getEdu]);

useEffect(() => {
  if (edu) {
    setLocalEdu(edu);
  }
}, [edu]);

  const handleChange = useCallback(
    (id: number, field: keyof Education, value: string) => {
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
        console.log("DATA SEND:", {
          education_id: eduId,
          name: value,
        });

        const res = await createCourse({
          id: eduId,
          name: value,
        });

        console.log("CREATE COURSE RES:", res);

        setLocalEdu((prev) =>
          prev.map((edu) =>
            edu.id === eduId
              ? {
                  ...edu,
                  courses: [...edu.courses, res.data || res],
                }
              : edu,
          ),
        );

        setNewCourse((prev) => ({
          ...prev,
          [eduId]: "",
        }));
      } catch (err) {
        console.log("ADD COURSE ERROR:", err);
      }
    },
    [newCourse, createCourse],
  );
const handleUpdateCourse = useCallback(
  async (eduId: number, courseId: number, name: string) => {
    try {
      const res = await updateCourse(courseId, {
        id: courseId,
        name,
      });

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
        console.log("SAVE ERROR:", err);
      }
    },
    [localEdu, updateEdu],
  );

  return {
    localEdu,
    editId,
    newCourse,

    setEditId,
    setNewCourse,

    handleChange,
    handleSave,
    handleAddCourse,
    handleDeleteCourse,
    handleUpdateCourse,
    handleDeleteEducation,
  };
}
