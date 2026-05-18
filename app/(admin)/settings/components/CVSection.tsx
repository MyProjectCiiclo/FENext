"use client";

import { FileText, Upload } from "lucide-react";
import { useState } from "react";

export default function CVSection() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="p-6 rounded-2xl border border-pink-100 bg-[#fff7fb] space-y-3">
      <div className="flex items-center gap-2 text-pink-500 font-semibold">
        <FileText size={18} />
        CV Management
      </div>

      <p className="text-gray-600 text-sm">
        Upload your CV (PDF only)
      </p>

      <label className="px-4 py-2 bg-pink-500 text-white rounded-xl cursor-pointer flex items-center gap-2 w-fit">
        <Upload size={16} />
        Upload CV
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
      </label>

      {file && (
        <p className="text-sm text-gray-500">
          Current file: <b>{file.name}</b>
        </p>
      )}
    </div>
  );
}