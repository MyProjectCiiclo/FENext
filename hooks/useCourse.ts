import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course.service";
import { CreateCourseDTO, UpdateCourseDTO } from "@/types/course.type";
import { toast } from "react-hot-toast";

export function useCourseMutation() {
  const queryClient = useQueryClient();

  const createCourse = useMutation({
    mutationFn: (data: CreateCourseDTO) => CourseService.createCourse(data),

    onMutate: () => {
      const toastId = toast.loading("Creating course...");
      return { toastId };
    },

    onSuccess: (_data, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },

    onError: (_err, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.error("Create course failed");
    },
  });

  const updateCourse = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCourseDTO }) =>
      CourseService.updateCourse(id, data),

    onMutate: () => {
      const toastId = toast.loading("Update course...");
      return { toastId };
    },

    onSuccess: (_data, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },

    onError: (_err, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.error("Update course failed");
    },
  });

  const deleteCourse = useMutation({
    mutationFn: (id: number) => CourseService.deleteCourse(id),

    onMutate: () => {
      const toastId = toast.loading("Delete course...");
      return { toastId };
    },

    onSuccess: (_data, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },

    onError: (_err, _vars, context) => {
      toast.dismiss(context?.toastId);
      toast.error("Delete course failed");
    },
  });

  return {
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
