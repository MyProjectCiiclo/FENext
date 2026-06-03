"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Project } from "@/types";

type Props = {
  initialData?: Project | null;
  onSave: (data: Project, file: File | null) => void;
  onClose: () => void;
};

export default function ProjectForm({
  initialData,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<Project>({
    id: 0,
    project_name: "",
    language: "",
    description: "",
    image_url: null,
    project_type: [],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id ?? 0,
        project_name: initialData.project_name ?? "",
        language: initialData.language ?? "",
        description: initialData.description ?? "",
        image_url: initialData.image_url ?? null,
        project_type: Array.isArray(initialData.project_type)
          ? initialData.project_type
          : initialData.project_type
          ? (initialData.project_type as string).split(",")
          : [],
      });

      setImageFile(null);
    }
  }, [initialData]);

  const handleImage = (file: File | null) => {
    if (!file) return;

    setImageFile(file);

    const url = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleSubmit = () => {
    onSave(form, imageFile);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white w-full max-w-xl p-6 rounded-2xl space-y-4 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400"
        >
          <X />
        </button>

        <h3 className="text-xl font-bold">
          {initialData ? "Update Project" : "Add Project"}
        </h3>

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Title"
          value={form.project_name}
          required
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              project_name: e.target.value,
            }))
          }
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Language"
          value={form.language}
          required
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              language: e.target.value,
            }))
          }
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Description"
          value={form.description}
          required
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded-xl"
          onChange={(e) => handleImage(e.target.files?.[0] || null)}
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Tech (comma separated)"
          value={form.project_type.join(",")}
          required
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              project_type: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            }))
          }
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-xl"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}