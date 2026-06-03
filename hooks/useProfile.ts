"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";

export function useProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await profileService.getProfile();

      return res?.data?.data ?? res?.data ?? null;
    },
  });

  const updateProfile = useMutation({
    mutationFn: profileService.updateProfile,

    onSuccess: (res) => {
      const updated = res?.data?.data ?? res?.data ?? null;

      queryClient.setQueryData(["profile"], updated);
    },
  });

  return {
    profile: query.data ?? null,
    loading: query.isLoading,

    updateProfile: updateProfile.mutateAsync, // 🔥 nên dùng mutateAsync
    isUpdating: updateProfile.isPending,
  };
}