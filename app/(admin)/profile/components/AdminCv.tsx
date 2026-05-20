"use client";

import { useState } from "react";
import { Upload, Download, Pencil, FileText } from "lucide-react";

export default function AdminCv() {
  const [edit, setEdit] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!cvFile) return;

    const url = URL.createObjectURL(cvFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = cvFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-white rounded-[32px] overflow-hidden border border-pink-100 shadow-[0_10px_40px_rgba(255,105,180,0.08)]">

      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
        <button
          onClick={() => setEdit(!edit)}
          className="absolute top-5 right-5 px-5 py-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-2 text-white hover:scale-105 transition"
        >
          <Pencil size={18} />
          {edit ? "Close Edit" : "Edit CV"}
        </button>
      </div>

      <div className="px-8 pb-8 relative">

        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <FileText className="text-pink-500" size={34} />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-6">
          CV Management
        </h2>

        <div className="mt-6 p-6 rounded-2xl border border-pink-100 bg-[#fff7fb]">

          <div className="space-y-2">
            {cvFile ? (
              <p className="text-gray-700">
                Current file:{" "}
                <span className="font-semibold text-pink-500">
                  {cvFile.name}
                </span>
              </p>
            ) : (
              <p className="text-gray-400">
                No CV uploaded yet
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-5">

            {edit && (
              <label className="px-5 py-2 rounded-2xl bg-pink-500 text-white flex items-center gap-2 cursor-pointer hover:scale-105 transition">
                <Upload size={16} />
                Upload CV

                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleUpload}
                />
              </label>
            )}

            <button
              onClick={handleDownload}
              disabled={!cvFile}
              className="px-5 py-2 rounded-2xl border border-pink-200 text-pink-500 flex items-center gap-2 disabled:opacity-40"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Upload your latest CV in PDF format for recruiters to download.
        </p>
      </div>
    </section>
  );
}