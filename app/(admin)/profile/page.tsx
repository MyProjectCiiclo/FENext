"use client";

import { useSearchParams } from "next/navigation";

import AdminLayout from "../AdminLayout";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/shared/Loading";


const AdminProfileInfo = dynamic(()=>
  import ("./components").then((module)=>module.AdminProfileInfo),
  {
    loading: () => <LoadingSpinner />,
  }
);

const AdminLoginPassword = dynamic(()=>
  import ("./components").then((module)=>module.AdminLoginPassword),
  {
    loading: () => <LoadingSpinner />,
  }
);

const AdminEducation = dynamic(()=>
  import ("./components").then((module)=>module.AdminEducation),
  {
    loading: () => <LoadingSpinner />,
  }
);

const AdminCvProjects = dynamic(()=>
  import ("./components").then((module)=>module.AdminCvProjects),
  {
    loading: () => <LoadingSpinner />,
  }
);



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
