import api from "@/lib/api";

export const cvService = {
  async sendCv(formData: FormData) {
    return await api.post("/cv/create-cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async updateCv(id: number, formData: FormData) {
    return await api.post(
      `/cv/update-cv/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  async getCv() {
    return await api.get("/cv/show-cv");
  },

  async deleteCv(id: number) {
    return await api.delete(`/cv/destroy/${id}`);
  },
};