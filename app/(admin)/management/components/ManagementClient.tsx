"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "../../AdminLayout";
import ContactManagement from "./ContactManagement";
import RatingManagement from "./RatingManagement";
import SkillManagement from "./SkillManagement";
import toast from "react-hot-toast";


export default function ManagementClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "managementContact";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login to access the management section");
      router.replace("/login");
    }
  }, []);

  return (
    <AdminLayout>
      {tab === "managementContact" && <ContactManagement />}
      {tab === "managementRating" && <RatingManagement />}
      {tab === "managementSkill" && <SkillManagement />}
    </AdminLayout>
  );
}