import { Suspense } from "react";;
import LoadingSpinner from "@/shared/Loading";
import ManagementClient from './components/ManagementClient';

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ManagementClient />
    </Suspense>
  );
}