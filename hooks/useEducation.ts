import { EducationService } from "@/services";
import { useState } from "react";

export function useEducation() {
  const [edu, setEdu] = useState<any[]>([]);

  // GET
  const getEdu = async () => {
    try {
      const res = await EducationService.getEdu();
      setEdu(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE
  const sendEdu = async (data: any) => {
    try {
      const res = await EducationService.sendEdu(data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // UPDATE (FIXED)
  const updateEdu = async (id: number, data: any) => {
    try {
      const res = await EducationService.updateEdu(id, data);

      setEdu((prev) =>
        prev.map((item) => (Number(item.id) === Number(id) ? res.data : item)),
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE (FIXED)
  const deleteEdu = async (id: number) => {
    try {
      await EducationService.deleteEdu(id);

      setEdu((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    edu,
    getEdu,
    sendEdu,
    updateEdu,
    deleteEdu,
  };
}
