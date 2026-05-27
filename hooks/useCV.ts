"use client";

import { useState, useCallback } from "react";
import { cvService } from "@/services";
import { Cv } from "@/types";
import toast from "react-hot-toast";

export default function useCv() {
  const [cv, setCv] = useState<Cv[]>([]);
  const [loading, setLoading] = useState(false);

  const infoCv = useCallback(async () => {
    setLoading(true);

    try {
      const res = await cvService.getCv();
      const list = res.data.data;

      setCv(list || []);
      return list;
    } catch (error) {
      console.log("GET CV ERROR:", error);
      toast.error("Failed to load CV");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCv = async (file: File) => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      await cvService.sendCv(formData);

      toast.success("Upload CV success 🎉");

      await infoCv();
    } catch (error: any) {
      console.log("UPLOAD ERROR:", error);

      const msg =
        error?.response?.data?.errors?.cv?.[0] ||
        "Upload CV failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateCv = async (id: number, file: File) => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);
      formData.append("_method", "PUT");

      await cvService.updateCv(id, formData);

      toast.success("Update CV success ✏️");

      await infoCv();
    } catch (error: any) {
      console.log("UPDATE ERROR:", error);

      const msg =
        error?.response?.data?.errors?.cv?.[0] ||
        "Update CV failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const deleteCv = async (id: number) => {
    setLoading(true);

    try {
      await cvService.deleteCv(id);

      toast.success("Delete CV success 🗑️");

      await infoCv();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      toast.error("Delete CV failed");
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