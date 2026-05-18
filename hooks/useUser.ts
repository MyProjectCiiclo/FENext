import { userService } from "@/services/user.service";
import { LoginForm, RegisterForm, User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  const infoUser = async (data: LoginForm) => {
    try {
      const userLogin = await userService.sendUserLogin(data);

      setUser(userLogin.data);

      toast.success("Login success!");

      return true;
    } catch (error: AxiosError<any>) {
      if (error.response?.status === 401) {
        toast.error("Email hoặc mật khẩu không đúng!");
      } else {
        toast.error("Login failed!");
      }

      return false;
    }
  };

  return {
    user,
    infoUser,
  };
}
