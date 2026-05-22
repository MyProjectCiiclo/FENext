'use client'

import { useState, useEffect, useCallback } from "react";
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
  const { createCourse, deleteCourse } = useCourse();

  const [educations, setEducations] = useState<EducationType[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [newCourse, setNewCourse] = useState<Record<number, string>>({});

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    getEdu();
  }, [getEdu]);

  useEffect(() => {
    if (edu) setEducations(edu);
  }, [edu]);

  // =========================
  // UPDATE FIELD
  // =========================
  const handleChange = useCallback(
    (id: number, field: keyof EducationType, value: string) => {
      setEducations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  // =========================
  // DELETE EDUCATION
  // =========================
  const handleDeleteEducation = useCallback(
    async (id: number) => {
      try {
        await deleteEdu(id);
        setEducations((prev) => prev.filter((item) => item.id !== id));
        setEditId(null);
      } catch (err) {
        console.log(err);
      }
    },
    [deleteEdu]
  );

  // =========================
  // ADD COURSE (UI ONLY)
  // =========================
  const handleAddCourse = useCallback(
    (id: number) => {
      const value = newCourse[id];
      if (!value?.trim()) return;

      setEducations((prev) =>
        prev.map((edu) =>
          edu.id === id
            ? {
                ...edu,
                courses: [
                  ...edu.courses,
                  { id: Date.now(), name: value },
                ],
              }
            : edu
        )
      );

      setNewCourse((prev) => ({
        ...prev,
        [id]: "",
      }));
    },
    [newCourse]
  );

  // =========================
  // DELETE COURSE (UI ONLY)
  // =========================
  const handleDeleteCourse = useCallback(
    (eduId: number, courseId: number) => {
      setEducations((prev) =>
        prev.map((edu) =>
          edu.id === eduId
            ? {
                ...edu,
                courses: edu.courses.filter((c) => c.id !== courseId),
              }
            : edu
        )
      );
    },
    []
  );

  // =========================
  // SAVE ALL (SYNC DB)
  // =========================
  const handleSave = useCallback(
    async (id: number) => {
      const data = educations.find((item) => item.id === id);
      if (!data) return;

      try {
        // =========================
        // 1. UPDATE EDUCATION
        // =========================
        await updateEdu(id, {
          school: data.school,
          degree: data.degree,
          major: data.major,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
        });

        // =========================
        // 2. DELETE OLD COURSES (DB)
        // =========================
        const oldCourses =
          edu.find((e) => e.id === id)?.courses || [];

        await Promise.all(
          oldCourses.map((course) =>
            deleteCourse(course.id)
          )
        );

        // =========================
        // 3. CREATE NEW COURSES (DB)
        // =========================
        await Promise.all(
          data.courses.map((course) =>
            createCourse({
              education_id: id,
              name: course.name,
            })
          )
        );

        // =========================
        // 4. REFRESH DATA
        // =========================
        await getEdu();
        setEditId(null);
      } catch (err) {
        console.log("SAVE ERROR:", err);
      }
    },
    [
      educations,
      edu,
      updateEdu,
      getEdu,
      deleteCourse,
      createCourse,
    ]
  );

  return (
    <div className="space-y-10">
      {educations.map((eduItem) => (
        <EducationCard
          key={eduItem.id}
          eduItem={eduItem}
          isEditing={editId === eduItem.id}
          onChange={handleChange}
          onDeleteEducation={handleDeleteEducation}
          onAddCourse={handleAddCourse}
          onDeleteCourse={handleDeleteCourse}
          onSave={handleSave}
          newCourseValue={newCourse[eduItem.id]}
          setNewCourseValue={setNewCourse}
          setEditId={setEditId}
        />
      ))}
    </div>
  );
}