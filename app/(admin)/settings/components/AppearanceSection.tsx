"use client";

import { Palette } from "lucide-react";

export default function AppearanceSection() {
  return (
    <div className="p-6 rounded-2xl border border-pink-100 bg-[#fff7fb] space-y-3">
      <div className="flex items-center gap-2 text-pink-500 font-semibold">
        <Palette size={18} />
        Appearance
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-600">Theme</p>

        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-sm">
          Pink Light Mode
        </span>
      </div>
    </div>
  );
}