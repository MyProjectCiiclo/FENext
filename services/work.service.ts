import { WorkYearGroup } from "@/types/work.type";
import api from "../lib/api";

export const workService = {
  async getWork(): Promise<WorkYearGroup[]> {
    const res = await api.get("/work-experiences");
    return res.data?.data ?? [];
  },
};
