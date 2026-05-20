import dynamic from "next/dynamic";
import AdminLayout from "../AdminLayout";
import { Dashboard } from "./components";
import LoadingSpinner from "@/shared/Loading";


const AnalyticsCharts = dynamic(()=>
  import ("./components").then((module)=>module.AnalyticsCharts),
{
  loading:() =><LoadingSpinner/>
}
);
const OverviewChart = dynamic(()=>
  import ("./components").then((module)=>module.OverviewChart),
{
  loading:() =><LoadingSpinner/>
}
);
export default function Page() {
  return (
    <AdminLayout>
      <Dashboard />
      <AnalyticsCharts />
      <OverviewChart />
    </AdminLayout>
  );
}