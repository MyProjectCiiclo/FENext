import { WorkExperience } from "@/types/work.type";
import api from "../lib/api";

export const workService = {
  async getWork(): Promise<WorkExperience[]> {
    const res = await api.get("/work-experiences");

    return res.data?.data || res.data?.work || res.data || [];
  },
};
