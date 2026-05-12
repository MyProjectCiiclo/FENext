import api from "../lib/api";

export const gitthubService = {
  async getContributions() {
    return api.get("/github/contributions");
  },
  async getGithubUser() {
    return api.get("/github/user");
  },
};
