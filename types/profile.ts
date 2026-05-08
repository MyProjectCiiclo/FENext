import { Skill } from "./skill";

export interface Profile {
  id: number;
  full_name: string;
  title:string;
  description:string;
  projects:number;
  years:number;
  clients:number;
  experience_years:number;
  degree:string;
  website:string;
  email:string;
  github:string;
  linkedin:string;
  avatar:string;
  cv_url: string;
  created_at?:string;
  updated_at?:string;
  skills: Skill[];

}
