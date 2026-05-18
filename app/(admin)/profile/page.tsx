"use client";

import { useSearchParams } from "next/navigation";

import AdminLayout from "../AdminLayout";

import {
  AdminProfileInfo,
  AdminLoginPassword,
  AdminCvProjects,
  AdminEducation,
} from "./components";

export default function ProfilePage() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

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
            <div className="flex-1">
              <AdminEducation />
            </div>
          </div>
        )}

        {tab === "cvProjects" && <AdminCvProjects />}
      </div>
    </AdminLayout>
  );
}
