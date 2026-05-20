"use client";

import { Shield } from "lucide-react";
import { useState } from "react";

export default function SecuritySection() {
  const [password, setPassword] = useState("");

  return (
    <div className="p-6 rounded-2xl border border-pink-100 bg-[#fff7fb] space-y-3">
      <div className="flex items-center gap-2 text-pink-500 font-semibold">
        <Shield size={18} />
        Security
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-2 border-pink-200 rounded-xl px-4 py-3 outline-none focus:border-pink-500"
        placeholder="New password"
      />

      <p className="text-sm text-gray-500">
        Change your password securely
      </p>
    </div>
  );
}