import { AdminHeader, AdminSidebar } from "./dashboard/components";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-64 fixed left-0 top-0 h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 h-screen overflow-y-auto p-5">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}