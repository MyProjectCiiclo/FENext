import { workService } from "@/services";
import { WorkExperience } from "@/types";
import { useState } from "react";

export function useWork() {
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState<WorkExperience[]>([]);

  const getWork = async () => {
    setLoading(true);

    try {
      const res = await workService.getWork();
      setWork(res || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { work, getWork, loading };
}
