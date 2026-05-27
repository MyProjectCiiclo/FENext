import { useState } from "react";
import { CourseService } from "@/services";
import { Course } from "@/types";

export function useCourse() {
  const [courses, setCourses] = useState<Course[]>([]);

  const createCourse = async (data: Course) => {
    try {
      const res = await CourseService.createCourse(data);

      setCourses((prev) => [...prev, res.data]);

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      await CourseService.deleteCourse(id);

      setCourses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  const updateCourse = async (id: number, data: Course) => {
    try {
      const res = await CourseService.updateCourse(id, data);

    console.log("🔥 RESPONSE FULL:", res);
    console.log("🔥 RESPONSE DATA:", res?.data);

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
