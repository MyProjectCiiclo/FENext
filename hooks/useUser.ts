import { userService } from "@/services/user.service";
import { LoginForm } from "@/types/user.type";
import { useState } from "react";

export function useUser() {
  const [user, setUser] = useState<LoginForm | null>(null);

  const infoUser = async (data: LoginForm) => {
    const res = await userService.sendUserLogin(data);

    setUser(res);
  };

  return {
    user,
    infoUser,
  };
}
