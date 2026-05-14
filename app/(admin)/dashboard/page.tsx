import AdminLayout from "../AdminLayout";
import { Dashboard, AnalyticsCharts, OverviewChart } from "./components";

export default function Page() {
  return (
    <AdminLayout>
      <Dashboard />
      <AnalyticsCharts />
      <OverviewChart />
    </AdminLayout>
  );
}