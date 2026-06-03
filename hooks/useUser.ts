"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function useUser() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUser();
      return res.data?.user as User;
    },
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await userService.sendUserLogin(data);
      toast.success("Logged in successfully");
      return res.data;
    },

    onSuccess: (data) => {
      const token = data?.access_token;

      if (token) {
        localStorage.setItem("token", token);
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await userService.logout();
      return res.data;
    },

    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login");
    },
  });

  return {
    user: userQuery.data,
    loading: userQuery.isLoading,
    error: userQuery.error,

    getUser: userQuery.refetch,
    infoUser: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
