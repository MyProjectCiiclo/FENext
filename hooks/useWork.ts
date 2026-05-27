import { workService } from "@/services";
import { WorkYearGroup } from "@/types";
import { useState } from "react";

export function useWork() {
  const [loading, setLoading] = useState(false);
  const [work, setWork] = useState<WorkYearGroup[]>([]);

  const getWork = async () => {
    setLoading(true);

    try {
      const res = await workService.getWork();
      setWork(res || []);
    } catch (err) {
      console.log(err);
      setWork([]);
    } finally {
      setLoading(false);
    }
  };

  return { work, getWork, loading };
}