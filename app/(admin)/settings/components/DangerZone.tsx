"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DangerZone() {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    const ok = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );

    if (!ok) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Account deleted!");
    }, 1000);
  };

  return (
    <div className="p-6 rounded-2xl border border-red-200 bg-red-50 space-y-3">
      <div className="flex items-center gap-2 text-red-500 font-semibold">
        <Trash2 size={18} />
        Danger Zone
      </div>

      <p className="text-sm text-red-400">
        Once deleted, your account cannot be recovered.
      </p>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded-xl disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
}