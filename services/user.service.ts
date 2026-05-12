import { LoginForm, RegisterForm } from "@/types/user.type";
import api from "../lib/api";

export const userService = {
  async sendUserLogin(data: LoginForm) {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async sendUserRegister(data: RegisterForm) {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};