export interface Course {
  id: number;
  name: string;
  education_id: number;
}

export type CreateCourseDTO = {
  name: string;
  education_id: number;
};

export type UpdateCourseDTO = {
  name: string;
};