
import { course } from './course.type';
export interface Education{
  id: number;
  school: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string | null;
  description: string;
  courses: course[];
}