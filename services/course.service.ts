import api from "@/lib/api";
import { Course } from "@/types";

export const CourseService = {
  createCourse: (data: Course) => {
    return api.post("/courses/create-courses", data);
  },

  deleteCourse: (id: number) => {
    return api.delete(`/courses/destroy/${id}`);
  },

  updateCourse: (id: number, data: Course) => {
    return api.put(`/courses/update-courses/${id}`, data);
  },
};