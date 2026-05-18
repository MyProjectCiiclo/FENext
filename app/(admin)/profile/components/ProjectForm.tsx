"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Project } from "./AdminProjects";

type Props = {
  initialData?: Project | null;
  onSave: (data: Project) => void;
  onClose: () => void;
};

export default function ProjectForm({
  initialData,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<Project>({
    title: "",
    desc: "",
    image: null,
    tech: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleImage = (file: File | null) => {
    setForm({ ...form, image: file });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-2xl space-y-4 relative">

        <button
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
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Description"
          value={form.desc}
          onChange={(e) =>
            setForm({ ...form, desc: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            handleImage(e.target.files?.[0] || null)
          }
        />

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Tech (comma separated)"
          value={form.tech.join(",")}
          onChange={(e) =>
            setForm({
              ...form,
              tech: e.target.value.split(","),
            })
          }
        />

        <button
          onClick={() => onSave(form)}
          className="w-full bg-pink-500 text-white py-3 rounded-xl"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}