import { useState } from "react";
import { CourseService } from "@/services";

export function useCourse() {
  const [courses, setCourses] = useState<any[]>([]);

  // CREATE
  const createCourse = async (data: any) => {
    try {
      const res = await CourseService.createCourse(data);

      setCourses((prev) => [...prev, res.data]);

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // DELETE
  const deleteCourse = async (id: number) => {
    try {
      await CourseService.deleteCourse(id);

      setCourses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // UPDATE
  const updateCourse = async (id: number, data: any) => {
    try {
      const res = await CourseService.updateCourse(id, data);

      setCourses((prev) =>
        prev.map((item) => (item.id === id ? res.data : item)),
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {
    courses,
    setCourses,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
