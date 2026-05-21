"use client";

import { useEffect, useState } from "react";
import { Upload, Download, Pencil, FileText, Trash2 } from "lucide-react";
import useCv from "@/hooks/useCV";

export default function AdminCv() {
  const [edit, setEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const { cv, infoCv, createCv, deleteCv } = useCv();

  useEffect(() => {
    infoCv();
  }, [infoCv]);

  const isValidUrl = (url: string) => {
    if (!url) return false;
    if (url.startsWith("file://")) return false;
    return true;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingUpload(true);

    try {
      await createCv(file);
      await infoCv();
      setEdit(false);
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleDownload = async (url: string) => {
    if (!isValidUrl(url)) return;

    try {
      const res = await fetch(url);
      const blob = await res.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "cv.pdf";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log("DOWNLOAD ERROR:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this CV?");
    if (!confirmDelete) return;

    setLoadingDelete(id);

    try {
      await deleteCv(id);
      await infoCv();
    } catch (error) {
      console.log("DELETE ERROR:", error);
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <section className="bg-white rounded-[32px] overflow-hidden border border-pink-100">
      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
        <button
          onClick={() => setEdit(!edit)}
          className="absolute top-5 right-5 flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/20 text-white"
        >
          <Pencil size={18} />
          {edit ? "Close Edit" : "Edit CV"}
        </button>
      </div>

      <div className="p-6">
        <FileText className="text-pink-500" size={34} />

        <h2 className="text-2xl font-bold mt-4">CV Management</h2>

        <div className="mt-6 space-y-4">
          {Array.isArray(cv) && cv.length > 0 ? (
            cv.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-2xl"
              >
                {isValidUrl(item.cv) ? (
                  <a
                    href={item.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 underline"
                  >
                    View CV {item.id}
                  </a>
                ) : (
                  <span className="text-gray-400">Invalid CV link</span>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDownload(item.cv)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-100"
                  >
                    <Download size={16} />
                    Download
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loadingDelete === item.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    {loadingDelete === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No CV uploaded</p>
          )}
        </div>

        {edit && (
          <label className="mt-6 inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-600">
            <Upload size={16} />
            {loadingUpload ? "Uploading..." : "Upload New CV"}

            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={handleUpload}
            />
          </label>
        )}

        <a
          href="https://res.cloudinary.com/droybexbj/raw/upload/v1779337532/buzkrwgbrxwi8dju3i2e.pdf"
          target="_blank"
        >
          Open CV
        </a>
      </div>
    </section>
  );
}
