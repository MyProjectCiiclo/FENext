import { skillService } from "@/services";
import { Skill } from "@/types";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export function useSkill() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const fetchSkills = useCallback(async () => {
    setLoading(true);

    try {
      const res = await skillService.getSkills();

      console.log("FULL RESPONSE:", res);

      setSkills(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  }, []);

  const createSkill = async (formData: FormData) => {
    try {
      const res = await skillService.createSkill(formData);

      console.log("CREATE RES:", res);

      const newSkill = res.data;

      setSkills((prev) => [newSkill, ...prev]);

      toast.success("Skill created");
    } catch (err) {
      console.log(err);
      toast.error("Create skill failed");
    }
  };

  const updateSkill = async (id: number, formData: FormData) => {
    try {
      const res = await skillService.updateSkill(id, formData);

      console.log("UPDATE RES:", res);

      const updatedSkill = res.data;

      setSkills((prev) =>
        prev.map((item) => (item.id === id ? updatedSkill : item)),
      );

      toast.success("Skill updated");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  const deleteSkill = async (id: number) => {
    try {
      await skillService.deleteSkill(id);

      setSkills((prev) => prev.filter((item) => item.id !== id));

      toast.success("Skill deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return {
    skills,
    setSkills,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    loading,
  };
}
