"use client";

import { useState } from "react";

import {
  Briefcase,
  GraduationCap,
} from "lucide-react";

import AdminCv from "./AdminCv";
import AdminProjects from "./AdminProjects";

export default function AdminCvProjects() {
  const [tab, setTab] = useState<
    "cv" | "projects"
  >("cv");

  return (
    <div className="bg-white rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-pink-100 p-2 rounded-2xl">
          <button
            onClick={() => setTab("cv")}
            className={`px-2 py-2 rounded-xl flex items-center gap-2 transition ${
              tab === "cv"
                ? "bg-pink-500 text-white"
                : "text-gray-600"
            }`}
          >
            <GraduationCap size={18} />
            CV
          </button>

          <button
            onClick={() =>
              setTab("projects")
            }
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition ${
              tab === "projects"
                ? "bg-pink-500 text-white"
                : "text-gray-600"
            }`}
          >
            <Briefcase size={18} />
            Projects
          </button>
        </div>
      </div>

      <div className="mt-8">
        {tab === "cv" && <AdminCv />}

        {tab === "projects" && (
          <AdminProjects />
        )}
      </div>
    </div>
  );
}