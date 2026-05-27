import api from "@/lib/api";
import { UpdateEducationDTO } from "@/types";

export const EducationService = {
  async getEdu() {
    try {
      const res = await api.get("/educations/show-educations");
      return res;
    } catch (error) {
      throw error;
    }
  },

  async sendEdu(data: UpdateEducationDTO) {
    try {
      const res = await api.post("/educations/create-educations", data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async updateEdu(id: number, data: UpdateEducationDTO) {
    try {
      const res = await api.put(`/educations/update-educations/${id}`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async deleteEdu(id: number) {
    try {
      const res = await api.delete(`/educations/destroy/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
