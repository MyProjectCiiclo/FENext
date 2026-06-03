import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course.service";
import {
  CreateCourseDTO,
  UpdateCourseDTO,
} from "@/types/course.type";
import { toast } from "react-hot-toast";

export function useCourseMutation() {
  const queryClient = useQueryClient();

  const createCourse = useMutation({
    mutationFn: (data: CreateCourseDTO) =>
      CourseService.createCourse(data),

    onSuccess: () => {
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  const updateCourse = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCourseDTO }) =>
      CourseService.updateCourse(id, data),

    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  const deleteCourse = useMutation({
    mutationFn: (id: number) =>
      CourseService.deleteCourse(id),

    onSuccess: () => {
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  return {
    createCourse,
    updateCourse,
    deleteCourse,
  };
}