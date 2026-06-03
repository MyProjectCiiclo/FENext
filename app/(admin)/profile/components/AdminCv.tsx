"use client";

import { useState } from "react";
import { Upload, Download, Pencil, FileText, Trash2, Eye } from "lucide-react";
import { useCv } from "@/hooks";
import { Cv } from "@/types";
import LoadingSpinner from "@/shared/Loading";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function AdminCv() {
  const [edit, setEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [viewUrl, setViewUrl] = useState<string | null>(null);

  const { cv, createCv, deleteCv } = useCv();

  const getCvUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/${path}`;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingUpload(true);

    try {
      await createCv(file);
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Delete CV?");
    if (!ok) return;

    setLoadingDelete(id);

    try {
      await deleteCv(id);
    } catch (err) {
      console.log("DELETE ERROR:", err);
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleDownload = (url: string) => {
    const fileUrl = getCvUrl(url);

    const downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-white rounded-[32px] border border-pink-100 overflow-hidden">
      <div className="relative h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300 flex items-center justify-between px-6">
        <h1 className="text-white font-bold text-lg">CV Dashboard</h1>

        <button
          onClick={() => setEdit(!edit)}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl"
        >
          <Pencil size={16} />
          {edit ? "Close" : "Edit"}
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-pink-500" />
          <h2 className="text-xl font-semibold">My CV</h2>
        </div>

        {(!cv || cv.length === 0) && (
          <div className="text-center py-10 text-gray-400">
            <LoadingSpinner/>
          </div>
        )}

        <div className="space-y-4">
          {(cv ?? []).map((item: Cv) => {
            const url = getCvUrl(item.cv);

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-2xl"
              >
                <div>
                  <p className="font-medium">CV</p>

                  <button
                    onClick={() => setViewUrl(url)}
                    className="flex items-center gap-1 text-pink-500 text-sm underline"
                  >
                    <Eye size={14} />
                    View
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(item.cv)}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    <Download size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loadingDelete === item.id}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                  >
                    {loadingDelete === item.id ? "..." : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {edit && (
          <div className="mt-6">
            <label className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl cursor-pointer">
              <Upload size={16} />
              {loadingUpload ? "Uploading..." : "Upload CV"}

              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={handleUpload}
              />
            </label>
          </div>
        )}
      </div>

      {viewUrl && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[85%] h-[90%] rounded-xl relative">
            <button
              onClick={() => setViewUrl(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <iframe src={viewUrl} className="w-full h-full" />
          </div>
        </div>
      )}
    </section>
  );
}
