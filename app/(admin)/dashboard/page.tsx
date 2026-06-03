"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamicImport from "next/dynamic";

import AdminLayout from "../AdminLayout";
import { Dashboard } from "./components";
import LoadingSpinner from "@/shared/Loading";
import toast from "react-hot-toast";

const AnalyticsCharts = dynamicImport(
  () =>
    import("./components").then(
      (module) => module.AnalyticsCharts
    ),
  {
    loading: () => <LoadingSpinner />,
  }
);

const OverviewChart = dynamicImport(
  () =>
    import("./components").then(
      (module) => module.OverviewChart
    ),
  {
    loading: () => <LoadingSpinner />,
  }
);

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to access the dashboard");
      router.replace("/login");
    }
  }, [router]);

  return (
    <AdminLayout>
      <Dashboard />
      <AnalyticsCharts />
      <OverviewChart />
    </AdminLayout>
  );
}