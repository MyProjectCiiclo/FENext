"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Pencil, Camera, Phone, MapPin } from "lucide-react";
import React from "react";

import { useProfile } from "@/hooks";
import LoadingSpinner from "@/shared/Loading";

export default function AdminProfileInfo() {
  const [editMode, setEditMode] = useState(false);

  const { profile, updateProfile, loading, isUpdating } = useProfile();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    title: "",
    description: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      full_name: profile.full_name ?? "",
      title: profile.title ?? "",
      description: profile.description ?? "",
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      github: profile.github ?? "",
      linkedin: profile.linkedin ?? "",
    });
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizeUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://${url}`;
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (isUpdating) return;
    if (!form.full_name.trim()) return;

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    await updateProfile(formData);

    setEditMode(false);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  if (loading) return <LoadingSpinner />;
  if (!profile) return <LoadingSpinner />;

  const avatarSrc = avatarPreview || profile.avatar || "/default-project.png";

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm">
      <div className="h-32 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <button
        onClick={() => setEditMode((v) => !v)}
        disabled={isUpdating}
        className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-2 text-white backdrop-blur-sm disabled:opacity-50"
      >
        <Pencil size={18} />
        {editMode ? "Close Edit" : "Edit Profile"}
      </button>

      <input
        ref={fileRef}
        type="file"
        hidden
        accept="image/*"
        onChange={onAvatarChange}
      />

      <div className="relative px-8 pb-8 pt-24">
        <div className="absolute left-8 -top-16">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white">
            <Image
              src={avatarSrc}
              alt="avatar"
              width={140}
              height={140}
              className="h-full w-full object-cover"
            />
          </div>

          {editMode && (
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 rounded-full bg-pink-500 p-2 text-white"
            >
              <Camera size={14} />
            </button>
          )}
        </div>

        <div className="mt-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Full Name</label>
            {editMode ? (
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
              />
            ) : (
              <h2 className="text-2xl font-bold">{form.full_name}</h2>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Title</label>
            {editMode ? (
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
              />
            ) : (
              <p className="text-pink-500">{form.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Description</label>
            {editMode ? (
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
              />
            ) : (
              <p className="leading-7 text-gray-600">{form.description}</p>
            )}
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-pink-600">
                <Phone size={18} />
                <span className="font-semibold">Phone</span>
              </div>

              {editMode ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-700">{form.phone}</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-pink-600">
                <MapPin size={18} />
                <span className="font-semibold">Location</span>
              </div>

              {editMode ? (
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-700">{form.location}</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-pink-600">GitHub</div>

              {editMode ? (
                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <a
                  href={normalizeUrl(form.github)}
                  target="_blank"
                  className="text-pink-500 underline"
                >
                  {form.github || "Not set"}
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-pink-50 p-5">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-pink-600">LinkedIn</div>

              {editMode ? (
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <a
                  href={normalizeUrl(form.linkedin)}
                  target="_blank"
                  className="text-pink-500 underline"
                >
                  {form.linkedin || "Not set"}
                </a>
              )}
            </div>
          </div>

          {editMode && (
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="mt-4 rounded-xl bg-pink-500 py-3 text-white transition hover:bg-pink-600 disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}