import { userService } from "@/services";
import { LoginForm, User } from "@/types";
import { validateEmail } from "@/utils/validate";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const infoUser = async (data: LoginForm): Promise<boolean> => {
    if (!data.email || !validateEmail(data.email)) {
      toast.error("Invalid email format");
      return false;
    }

    setLoading(true);

    try {
      const response = await userService.sendUserLogin(data);

      console.log("LOGIN RESPONSE:", response.data);

      const userData = response.data?.user;
      const token = response.data?.access_token;
      
      if (!token) {
        console.log("❌ NO TOKEN FROM BACKEND");
        toast.error("Server did not return token");
        return false;
      }

      setUser(userData);
      localStorage.setItem("token", token);

      toast.success("Login success!");
      return true;
    } catch (error: unknown) {
      const err = error as AxiosError<any>;

      console.log("LOGIN ERROR:", err.response?.data);
      console.log("STATUS:", err.response?.status);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 401) {
        toast.error("Incorrect email or password");
      } else if (status === 422) {
        toast.error(message || "Validation error");
      } else {
        toast.error(message || "Login failed!");
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
