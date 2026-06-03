// import AdminLayout from "../AdminLayout";
// import ContactManagement from "./components/ContactManagement";
// import RatingManagement from "./components/RatingManagement";
// import SkillManagement from "./components/SkillManagement";

// type Props = {
//   searchParams: Promise<{
//     tab?: string;
//   }>;
// };

// export default async function ManagementPage({ searchParams }: Props) {
//   const params = await searchParams;
//   const tab = params.tab || "managementContact";

//   return (
//     <AdminLayout>
//       {tab === "managementContact" && <ContactManagement />}

//       {tab === "managementRating" && <RatingManagement />}

//       {tab === "managementSkill" && <SkillManagement />}
//     </AdminLayout>
//   );
// }



"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AdminLayout from "../AdminLayout";
import ContactManagement from "./components/ContactManagement";
import RatingManagement from "./components/RatingManagement";
import SkillManagement from "./components/SkillManagement";

export default function ManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "managementContact";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vui lòng login");
      router.push("/login");
    }
  }, [router]);

  return (
    <AdminLayout>
      {tab === "managementContact" && <ContactManagement />}

      {tab === "managementRating" && <RatingManagement />}

      {tab === "managementSkill" && <SkillManagement />}
    </AdminLayout>
  );
}