import { CourseService } from "@/services/course.service";
import {
  Course,
} from "@/types/course.type";
import { useState } from "react";

export function useCourse() {
  const [courses, setCourses] = useState<Course[]>([]);

  const createCourse = async (data: Course) => {
    try {
      const res = await CourseService.createCourse(data);

      setCourses((prev) => [...prev, res.data]);

      return res.data;
    } catch (err) {
      console.log("CREATE COURSE ERROR:", err);
      throw err;
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      await CourseService.deleteCourse(id);

      setCourses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log("DELETE COURSE ERROR:", err);
      throw err;
    }
  };

  const updateCourse = async (id: number, data: Course) => {
    try {
      const res = await CourseService.updateCourse(id, data);

      setCourses((prev) =>
        prev.map((item) => (item.id === id ? res.data : item)),
      );

      return res.data;
    } catch (err) {
      console.log("UPDATE COURSE ERROR:", err);
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