"use client";

import { useState } from "react";
import { userService } from "@/services";
import { User } from "@/types";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);

    try {
      const response = await userService.getUser();

      const userData = response.data?.user;

      setUser(userData);

      return userData;
    } catch (error) {
      console.log("GET USER ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const infoUser = async (data: { email: string; password: string }) => {
    setLoading(true);

    try {
      const response = await userService.sendUserLogin(data);

      console.log(response.data);

      const token = response.data?.access_token;

      if (token) {
        localStorage.setItem("token", token);
      }

      return true;
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    getUser,
    infoUser,
  };
}
