import { SkillService } from "@/services/skill.service";
import { Skill } from "@/types/skill";
import { useState } from "react";
import toast from "react-hot-toast";

export function useSkill() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkill] = useState<Skill[]>([]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await SkillService.getSkills();
      setSkill(res.data.data.skills);
      toast.success("Success!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { skills, fetchSkills, loading };
}
