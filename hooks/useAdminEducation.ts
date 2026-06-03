"use client";


import { useState } from "react";
import { useEducation } from "@/hooks/useEducation";




export function useAdminEducation() {
  const { edu, createEdu, updateEdu, deleteEdu } = useEducation();


  const [editId, setEditId] = useState<number | null>(null);
  const [newCourse, setNewCourse] = useState<Record<number, string>>({});


  return {
    edu,
    editId,
    setEditId,
    newCourse,
    setNewCourse,


    createEdu,
    updateEdu,
    deleteEdu,
  };
}

