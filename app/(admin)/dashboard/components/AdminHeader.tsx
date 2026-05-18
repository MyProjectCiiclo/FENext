"use client";

import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full mb-6">
      <div
        className="
          flex items-center
          gap-4
          px-4 py-3
          rounded-full
          bg-white
          border border-pink-100
          shadow-sm
          hover:shadow-lg
          transition
          focus-within:ring-2
          focus-within:ring-pink-200
        "
      >
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-50">
          <Search className="text-pink-500" size={18} />
        </div>

        <input
          type="text"
          placeholder="Search anything in dashboard..."
          className="
            w-full
            bg-transparent
            outline-none
            text-gray-700
            placeholder:text-gray-400
          "
        />
      </div>
    </header>
  );
}