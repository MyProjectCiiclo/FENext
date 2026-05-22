import api from "@/lib/api";

export const CourseService = {
  createCourse: (data: any) => {
    return api.post("/courses/create-courses", data);
  },

  deleteCourse: (id: number) => {
    return api.delete(`/courses/destroy/${id}`);
  },

  updateCourse: (id: number, data: any) => {
    return api.put(`/courses/update-courses/${id}`, data);
  },
};