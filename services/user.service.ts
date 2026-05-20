import { LoginForm, RegisterForm } from "@/types/user.type";
import api from "../lib/api";

export const userService = {
  async sendUserLogin(data: LoginForm) {
    try {
      const res = await api.post("/auth/login", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
