import { WorkExperience } from "@/types/work.type";
import api from "../lib/api";

export const workService = {
  async getWork(): Promise<WorkExperience[]> {
    try {
      const res = await api.get("/work-experiences");

      return (
        res.data?.data ??
        res.data?.work ??
        res.data ??
        []
      );
    } catch (error) {
      throw error;
    }
  },
};