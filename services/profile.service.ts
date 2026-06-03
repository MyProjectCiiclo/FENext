import api from "@/lib/api";

export const profileService = {
  async getProfile() {
    const res = await api.get("/profile");
    return res.data;
  },

  async updateProfile(data: FormData) {
    data.append("_method", "PUT");

    const res = await api.post("/profile/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
};