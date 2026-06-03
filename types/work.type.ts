export interface WorkExperiences {
   id: number;
  title: string;
  company: string;
  description: string;
  date_range: string;
  years: number;
  logo: string;
}


export interface WorkYearGroup {
  year: number;
  total: number;
  work_experiences: WorkExperiences[];
}