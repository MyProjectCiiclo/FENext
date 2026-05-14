import AdminLayout from "../AdminLayout";
import { AdminProfileInfo,AdminLoginPassword } from "./components";

export default function ProfilePage() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <AdminProfileInfo />
        </div>

        <div>
          <AdminLoginPassword />
        </div>
      </div>
    </AdminLayout>
  );
}
