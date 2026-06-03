import { Course } from "./course.type";

export interface Education {
  id: number;
  school: string;
  degree: string;
  major: string;
  start_date: string | null | undefined;
  end_date: string | null | undefined;
  description: string;
  courses: Course[];
}

export type UpdateEducationDTO = {
  school: string;
  degree: string;
  major: string;
  start_date: string | null | undefined;
  end_date: string | null | undefined;
  description: string;
};
