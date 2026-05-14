import { userService } from "@/services/user.service";
import { LoginForm, RegisterForm, User } from "@/types/user.type";
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
    } catch (error) {
      toast.error("Login failed!");
      return false;
    }
  };

  const infoRegister = async (data: RegisterForm) => {
    try {
      const userRegister = await userService.sendUserRegister(data);

      setUser(userRegister.data);

      toast.success("Register success!");

      return true;
    } catch (error) {
      toast.error("Register failed!");
      return false;
    }
  };

  return {
    user,
    infoUser,
    infoRegister,
  };
}
