import api from "@/lib/api";

export const projectService = {
  async sendProject(data: FormData) {
    try {
      const res = await api.post("/project/create-project", data);

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async getProjects(page = 1, limit = 9) {
    try {
      const res = await api.get(
        `/project/show-project?page=${page}&limit=${limit}`
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProject(id: number, data: FormData) {
    try {
      const res = await api.post(
        `/project/update-project/${id}`,
        data
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteProject(id: number) {
    try {
      const res = await api.delete(`/project/destroy/${id}`);

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};