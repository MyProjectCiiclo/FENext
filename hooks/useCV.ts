import { useState, useCallback } from "react";
import { cvService } from "@/services";

export default function useCv() {
  const [cv, setCv] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const infoCv = useCallback(async () => {
    setLoading(true);

    try {
      const res = await cvService.getCv();
      const list = res.data.data;

      setCv(list || []);
    } catch (error) {
      console.log("GET CV ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCv = async (file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const res = await cvService.sendCv(formData);

      console.log("UPLOAD SUCCESS:", res.data);

      await infoCv();
    } catch (error: any) {
      console.log("UPLOAD ERROR:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const updateCv = async (id: number, file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("_method", "PUT");

      await cvService.updateCv(id, formData);

      await infoCv();
    } catch (error) {
      console.log("UPDATE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCv = async (id: number) => {
    setLoading(true);

    try {
      await cvService.deleteCv(id);

      await infoCv();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    cv,
    loading,
    infoCv,
    createCv,
    updateCv,
    deleteCv,
  };
}