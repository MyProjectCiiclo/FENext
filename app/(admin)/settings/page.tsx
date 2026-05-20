"use client";

import AdminLayout from "../AdminLayout";
import AccountSection from "./components/SecuritySection";
import { AppearanceSection, CVSection, DangerZone, SecuritySection } from "./components";

export default function ProfilePage() {

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <AccountSection />
        <SecuritySection />
        <AppearanceSection />
        <CVSection />
        <DangerZone />
      </div>
    </AdminLayout>
  );
}
