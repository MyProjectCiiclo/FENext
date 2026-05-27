import api from "@/lib/api";

export const profileService = {
  getProfile: async () => {
    return await api.get("/profile");
  },

  updateProfile: async (data: FormData) => {
    data.append("_method", "PUT");

    return await api.post("/profile/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
