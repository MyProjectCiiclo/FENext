import AdminLayout from "../AdminLayout";
import ContactManagement from "./components/ContactManagement";
import RatingManagement from "./components/RatingManagement";

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
    </AdminLayout>
  );
}
