import { LoginForm } from "@/types/user.type";
import api from "../lib/api";
import toast from "react-hot-toast";

export const userService = {
  async sendUserLogin(data: LoginForm) {
    try {
      const res = await api.post("/auth/login", data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async getUser() {
    try {
      const res = await api.get("/auth/me");
      return res;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const res = await api.post("/auth/logout");
      toast.success("Logged out successfully");
      return res;
    } catch (error) {
      throw error;
    }
  },
};
