import { skillService } from "@/services";
import { Skill } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export function useSkill() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const fetchSkills = async () => {
    setLoading(true);

    try {
      const res = await skillService.getSkills();

      setSkills(res.data.data.skills);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { skills, fetchSkills, loading };
}