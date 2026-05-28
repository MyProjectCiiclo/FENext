"use client";

import EducationCard from "./EducationCard";

import LoadingSpinner from "@/shared/Loading";

import { useAdminEducation } from "@/hooks/useAdminEducation";

export default function AdminEducation() {
  const {
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
  } = useAdminEducation();

  if (!localEdu.length) {
    return <LoadingSpinner />;
  }

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