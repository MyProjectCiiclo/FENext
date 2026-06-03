import { Suspense } from "react";
import LoadingSpinner from "@/shared/Loading";
import AdminSidebarClient from "./AdminSidebarClient";

export default function AdminSidebar() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminSidebarClient />
    </Suspense>
  );
}