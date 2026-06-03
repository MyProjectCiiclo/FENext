import api from "@/lib/api";
import { Course, CreateCourseDTO, UpdateCourseDTO } from "@/types";

export const CourseService = {
  createCourse: async (data: CreateCourseDTO) => {
    const res = await api.post("/courses/create-courses", data);
    return res.data;
  },

  deleteCourse: async (id: number) => {
    const res = await api.delete(`/courses/destroy/${id}`);
    return res.data;
  },

  updateCourse: async (id: number, data: UpdateCourseDTO) => {
    const res = await api.put(`/courses/update-courses/${id}`, data);
    return res.data;
  },
};