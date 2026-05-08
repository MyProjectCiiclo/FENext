export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  logo?: string;
  description: string;
  startDate: string;
  endDate: string;

  date_range?: string; 
}