import { SkillService } from "@/services/skill.service";
import { Profile } from "@/types/profile.type";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAbout() {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState<Profile | null>(null);

  const getAbout = async () => {
    setLoading(true);

    try {
      const res = await SkillService.getSkills();
      setAbout(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    about,
    getAbout,
  };
}