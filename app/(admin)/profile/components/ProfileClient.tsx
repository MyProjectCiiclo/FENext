"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/shared/Loading";
import AdminLayout from "../../AdminLayout";
import toast from "react-hot-toast";

const AdminProfileInfo = dynamic(() => import("./AdminProfileInfo"), {
  loading: () => <LoadingSpinner />,
});

const AdminLoginPassword = dynamic(() => import("./AdminLoginPassword"), {
  loading: () => <LoadingSpinner />,
});

const AdminEducation = dynamic(() => import("./AdminEducation"), {
  loading: () => <LoadingSpinner />,
});

const AdminCvProjects = dynamic(() => import("./AdminCvProjects"), {
  loading: () => <LoadingSpinner />,
});

export default function ProfileClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login to access the profile");
      router.replace("/login");
    }
  }, [router]);

  return (
    <AdminLayout>
      <div className="w-full">
        {(!tab || tab === "personal") && (
          <div className="flex gap-6">
            <div className="flex-1">
              <AdminProfileInfo />
            </div>

            <div className="flex-1">
              <AdminLoginPassword />
            </div>
          </div>
        )}

        {tab === "profileEducation" && (
          <div className="flex gap-6">
            <AdminEducation />
          </div>
        )}

        {tab === "cvProjects" && <AdminCvProjects />}
      </div>
    </AdminLayout>
  );
}
