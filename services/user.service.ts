import { LoginForm } from "@/types/user.type";
import api from "../lib/api";

export const userService = {
  async sendUserLogin(data: LoginForm) {
    const res = await api.post("auth/login", data);
    return res.data;
  },
  async sendUserRegister() {
    const res = await api.post("auth/register");
    return res.data;
  },
};
