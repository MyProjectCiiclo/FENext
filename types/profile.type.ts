import { Skill } from "./skill.type";

export interface Profile {
  id: number;
  full_name: string;
  title: string;
  description: string;
  projects: number;
  years: number;
  clients: number;
  experience_years: number;
  degree: string;
  website: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: string;
  cv_url: string;
  location: string;
  phone:string;
  created_at?: string;
  updated_at?: string;
  skills: Skill[];
}
