import { profileService } from "@/services/profile.service";
import { Profile } from "@/types";
import { useCallback, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await profileService.getProfile();
      setProfile(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await profileService.updateProfile(data);

      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    getProfile,
    updateProfile,
  };
}
