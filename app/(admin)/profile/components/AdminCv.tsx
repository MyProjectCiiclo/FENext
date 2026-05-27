"use client";

import { useEffect, useState } from "react";
import { Upload, Download, Pencil, FileText, Trash2 } from "lucide-react";

import { Cv } from "@/types";
import useCv from "@/hooks/useCV";

export default function AdminCv() {
  const [edit, setEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [viewUrl, setViewUrl] = useState<string | null>(null);

  const { cv, infoCv, createCv, deleteCv } = useCv();

  useEffect(() => {
    infoCv();
  }, [infoCv]);

  const isValidUrl = (url: string) => {
    return !!url && url.startsWith("http");
  };

  const getPreviewUrl = (url: string) => {
    if (!url) return "";

    return url.replace("/upload/", "/upload/fl_inline/");
  };

  const getDownloadUrl = (url: string) => {
    if (!url) return "";

    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingUpload(true);

    try {
      await createCv(file);
      setEdit(false);
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
    } finally {
      setLoadingUpload(false);
      e.target.value = "";
    }
  };

  const handleDownload = (url: string) => {
    if (!isValidUrl(url)) return;

    const downloadUrl = getDownloadUrl(url);
    window.open(downloadUrl, "_blank");
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("Are you sure delete this CV?");
    if (!ok) return;

    setLoadingDelete(id);

    try {
      await deleteCv(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(null);
    }
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

        {cv.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No CV uploaded yet
          </div>
        )}
        <div className="space-y-4">
          {cv.map((item: Cv) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-2xl hover:shadow-sm transition"
            >
              <div>
                <p className="font-medium">CV</p>

                {isValidUrl(item.cv) ? (
                  <div className="flex gap-3 mt-1">
                    <a
                      href={item.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 text-sm underline"
                    >
                      View CV
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Invalid file</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(item.cv)}
                  className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
                >
                  <Download size={14} />
                  Download
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={loadingDelete === item.id}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {loadingDelete === item.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {edit && (
          <div className="mt-6">
            <label className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-pink-600">
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
          <div className="bg-white w-[85%] h-[90%] rounded-xl overflow-hidden relative">
            <button
              onClick={() => setViewUrl(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded z-10"
            >
              Close
            </button>

            <iframe src={viewUrl} className="w-full h-full" title="CV Viewer" />
          </div>
        </div>
      )}
    </section>
  );
}
