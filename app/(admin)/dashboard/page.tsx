"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import AdminLayout from "../AdminLayout";
import { Dashboard } from "./components";
import LoadingSpinner from "@/shared/Loading";

const AnalyticsCharts = dynamic(
  () =>
    import("./components").then(
      (module) => module.AnalyticsCharts
    ),
  {
    loading: () => <LoadingSpinner />,
  }
);

const OverviewChart = dynamic(
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
      alert("Vui lòng login");
      router.push("/login");
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