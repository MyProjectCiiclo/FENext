import AdminLayout from "../AdminLayout";
import ContactManagement from "./components/ContactManagement";
import RatingManagement from "./components/RatingManagement";
import SkillManagement from "./components/SkillManagement";

type Props = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function ManagementPage({ searchParams }: Props) {
  const params = await searchParams;
  const tab = params.tab || "managementContact";

  return (
    <AdminLayout>
      {tab === "managementContact" && <ContactManagement />}

      {tab === "managementRating" && <RatingManagement />}

      {tab === "managementSkill" && <SkillManagement />}
    </AdminLayout>
  );
}
