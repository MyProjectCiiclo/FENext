import api from "../lib/api";

export const skillService = {
  async getSkills() {
    try {
      const res = await api.get("/profile");
      return res;
    } catch (error) {
      console.error("[skillService.getProfile] Error:", error);
      throw error;
    }
  },
};


