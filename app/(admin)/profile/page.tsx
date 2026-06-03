import { Suspense } from "react";
import LoadingSpinner from "@/shared/Loading";
import ProfileClient from "./components/ProfileClient";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileClient />
    </Suspense>
  );
}