import { userService } from "@/services/user.service";
import { LoginForm, User } from "@/types/user.type";
import { validateEmail } from "@/utils/validate";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const infoUser = async (data: LoginForm): Promise<boolean> => {
    setLoading(true);

    try {
      if (!data.email || !validateEmail(data.email)) {
        toast.error("Invalid email format");
        return false;
      }

      const response = await userService.sendUserLogin(data);

      setUser(response.data);

      toast.success("Login success!");

      return true;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 401) {
        toast.error("Incorrect email or password");
      } else if (status === 422) {
        const message = data?.message || "Validation error";

        toast.error(message);
      } else {
        toast.error("Login failed!");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    loading,
    infoUser,
  };
}
