import api from "../lib/api";

export const SkillService = {
  async getSkills() {
    return api.get("/profile");
  },
};
