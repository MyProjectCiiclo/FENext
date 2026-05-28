"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Pencil, Camera, Phone, MapPin } from "lucide-react";
import React from "react";

import { useProfile } from "@/hooks/useProfile";
import { useGithub } from "@/hooks/useGithub";
import { useRating } from "@/hooks/useRating";
import { useContact } from "@/hooks/useContact";
import LoadingSpinner from "@/shared/Loading";

export default function AdminProfileInfo() {
  const [editMode, setEditMode] = useState(false);

  const { profile, getProfile, updateProfile } = useProfile();
  const { getGithub } = useGithub();
  const { getRating } = useRating();
  const { getContact } = useContact();

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    title: "",
    description: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    getProfile();
    getGithub();
    getRating();
    getContact();
  }, []);

  useEffect(() => {
    if (!profile) return;

    setForm({
      full_name: profile.full_name ?? "",
      title: profile.title ?? "",
      description: profile.description ?? "",
      phone: profile.phone ?? "",
      location: profile.location ?? "",
    });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("full_name", form.full_name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("phone", form.phone);
    formData.append("location", form.location);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      await updateProfile(formData);
      await getProfile();

      setEditMode(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      console.log("UPDATE PROFILE ERROR:", err);
    }
  };

  const avatarSrc = avatarPreview || profile?.avatar || "/default-project.png";

  if (!profile) return <LoadingSpinner />;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm">
      <div className="h-32 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <button
        onClick={() => setEditMode((v) => !v)}
        className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-2 text-white backdrop-blur-sm"
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

          {editMode && (
            <button
              onClick={handleSave}
              className="mt-4 rounded-xl bg-pink-500 py-3 text-white transition hover:bg-pink-600"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
