import { workService } from "@/services/work.service";
import { WorkExperience } from "@/types/Work";
import { useState } from "react";
import toast from "react-hot-toast";

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
