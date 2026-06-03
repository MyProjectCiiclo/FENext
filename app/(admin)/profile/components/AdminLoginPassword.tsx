"use client";

import { useEffect, useState } from "react";
import { Pencil, Eye, EyeOff, User } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import LoadingSpinner from "@/shared/Loading";

export default function ProfilePage() {
  const { user, getUser } = useUser();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <section className="bg-white rounded-[32px] overflow-hidden border border-pink-100 shadow-[0_10px_40px_rgba(255,105,180,0.08)] relative">

      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
      </div>

      <div className="px-8 pb-10 relative">

        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <User className="text-pink-500" size={36} />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-6">
          Login & Password
        </h2>

        <p className="text-[#6d4b59] mt-2">
          Update your login information and secure your account.
        </p>

        <div className="mt-8 space-y-5">
          <div className="flex items-center">
            <p className="text-pink-500 text-sm font-medium w-40">EMAIL</p>
            <p className="text-gray-700 font-semibold">
              {user?.email || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}