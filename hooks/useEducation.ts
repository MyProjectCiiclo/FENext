import { EducationService } from "@/services";
import { useState } from "react";
import { Education, UpdateEducationDTO } from "@/types";

export function useEducation() {
  const [edu, setEdu] = useState<Education[]>([]);

  const getEdu = async () => {
    try {
      const res = await EducationService.getEdu();
      setEdu(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendEdu = async (data: UpdateEducationDTO) => {
    try {
      const res = await EducationService.sendEdu(data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateEdu = async (id: number, data: UpdateEducationDTO) => {
    try {
      const res = await EducationService.updateEdu(id, data);

      setEdu((prev) =>
        prev.map((item) =>
          item.id === id ? res.data : item
        )
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

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