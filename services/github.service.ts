import api from "../lib/api";

export const githubService = {
  async getContributions() {
    try {
      const res = await api.get("/github/contributions");
      return res;
    } catch (error) {
      throw error;
    }
  },

  async getGithubUser() {
    try {
      const res = await api.get("/github/user");
      return res;
    } catch (error) {
      throw error;
    }
  },
};