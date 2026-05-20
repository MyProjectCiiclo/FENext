"use client";

import { useRef, useState } from "react";
import { Profile } from "@/types/profile.type";

type Props = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  setEdit: (value: boolean) => void;
};

export default function AdminProfileEditForm({
  profile,
  setProfile,
  setEdit,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(profile.avatar);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    setProfile((prev) => ({
      ...prev,
      avatar: url,
    }));
  }

  return (
    <div className="bg-white p-6 rounded-3xl border shadow">
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <div className="flex items-center gap-4 mb-6">
        <img
          src={preview}
          className="w-20 h-20 rounded-full object-cover border"
          alt="avatar"
        />

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 bg-pink-500 text-white rounded-xl"
        >
          Change Avatar
        </button>
      </div>

      <input
        name="title"
        value={profile.title}
        onChange={handleChange}
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Title"
        required
      />

      <textarea
        name="description"
        value={profile.description}
        onChange={handleChange}
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Description"
        required
      />

      <input
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Phone" 
        required
      />

      <input
        name="location"
        value={profile.location}
        onChange={handleChange}
        className="w-full border p-2 rounded-xl mb-3"
        placeholder="Location"
        required
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setEdit(false)}
          className="px-4 py-2 border rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={() => setEdit(false)}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl"
        >
          Save
        </button>
      </div>
    </div>
  );
}