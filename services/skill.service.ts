import api from "../lib/api";

export const skillService = {
  async getSkills() {
    try {
      const res = await api.get("/skills");

      return res.data;
    } catch (error) {
      console.error("[skillService.getSkills] Error:", error);

      throw error;
    }
  },

  async createSkill(formData: FormData) {
  try {
    const res = await api.post("/skills/create-skills", formData);

    return res.data;
  } catch (error) {
    console.error("[skillService.createSkill] Error:", error);
    throw error;
  }
},


  async updateSkill(id: number, formData: FormData) {
    try {
      const res = await api.post(`/skills/update-skills/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("UPDATE RES:", res.data);

      return res.data;
    } catch (error) {
      console.error("[skillService.updateSkill] Error:", error);

      throw error;
    }
  },

  async deleteSkill(id: number) {
    try {
      const res = await api.delete(`/skills/destroy/${id}`);

      return res.data;
    } catch (error) {
      console.error("[skillService.deleteSkill] Error:", error);

      throw error;
    }
  },
};
