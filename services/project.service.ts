import api from "@/lib/api";

export const projectService = {
  async sendProject(data: FormData) {
    const res = await api.post("/project/create-project", data);
    return res.data;
  },

  async getProjects(page = 1, limit = 9) {
    const res = await api.get(
      `/project/show-project?page=${page}&limit=${limit}`
    );

    return res.data;
  },

  async updateProject(id: number, data: FormData) {
    data.append("_method", "PUT");

    const res = await api.post(
      `/project/update-project/${id}`,
      data
    );

    return res.data;
  },

  async deleteProject(id: number) {
    const res = await api.delete(`/project/destroy/${id}`);
    return res.data;
  },
};