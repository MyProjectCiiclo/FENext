"use client";

import { User } from "lucide-react";
import { useState } from "react";

export default function AccountSection() {
  const [username, setUsername] = useState("admin_user");

  return (
    <div className="p-6 rounded-2xl border border-pink-100 bg-[#fff7fb] space-y-3">
      <div className="flex items-center gap-2 text-pink-500 font-semibold">
        <User size={18} />
        Account
      </div>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
        placeholder="Username"
      />

      <p className="text-sm text-gray-500">
        Manage your account information
      </p>
    </div>
  );
}