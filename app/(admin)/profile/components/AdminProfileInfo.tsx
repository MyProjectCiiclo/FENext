"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Pencil, Camera } from "lucide-react";
import type React from "react";
import { useAvatarUpload } from "./useAvatarUpload";

export default function AdminProfileInfo() {
  const [edit, setEdit] = useState(false);

  const { avatar, fileRef, handleAvatarClick, handleAvatarChange } =
    useAvatarUpload("/assets/image-personal.png");

  const [profile, setProfile] = useState({
    full_name: "Ho Thi Kim Thanh",
    title: "Full Stack Developer",
    description:
      "I specialize in creating scalable, user-friendly web applications.",
    email: "hokimthanh1234@gmail.com",
    phone: "+84 335 044 593",
    location: "Da Nang, Vietnam",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div
      className="
        bg-white
        rounded-[32px]
        overflow-hidden
        border border-pink-100
        shadow-[0_10px_40px_rgba(255,105,180,0.08)]
        relative
      "
    >
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleAvatarChange}
        className="hidden"
      />

      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 blur-3xl opacity-40" />

      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
        <button
          onClick={() => setEdit(!edit)}
          className="
            absolute top-5 right-5
            px-5 py-2
            rounded-2xl
            bg-white/20
            backdrop-blur-md
            border border-white/30
            flex items-center gap-2
            text-white
            hover:scale-105
            transition
            z-50
          "
        >
          <Pencil size={18} />
          {edit ? "Close" : "Edit Profile"}
        </button>
      </div>

      <div className="relative px-8 pb-8">
        <div className="-mt-16 flex justify-between items-end">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-[5px] border-white shadow-xl">
              <Image src={avatar} alt="avatar" width={140} height={140} className="w-full h-full object-cover"
              />
            </div>

            <button onClick={handleAvatarClick} className="   absolute bottom-1 right-1   w-10 h-10   rounded-full   bg-pink-500   text-white   flex items-center justify-center   border-4 border-white "
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium">
            Online
          </div>
        </div>

        <div
          className={`
            mt-6
            transition-all
            duration-300
            ${edit ? "ring-4 ring-pink-100 rounded-3xl p-4 bg-pink-50/30" : ""}
          `}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            {profile.full_name}
          </h2>

          <div className="mt-4">
            {edit ? (
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-pink-300 bg-white px-4 py-3 text-pink-500 font-semibold outline-none focus:border-pink-500"
              />
            ) : (
              <p className="text-pink-500 font-semibold text-lg">
                {profile.title}
              </p>
            )}
          </div>

          <div className="mt-2">
            {edit ? (
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border-2 border-pink-300 bg-white px-4 py-4 outline-none resize-none focus:border-pink-500"
              />
            ) : (
              <p className="text-[#6d4b59] leading-8 text-[16px]">
                {profile.description}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#fff7fb] border border-pink-100 rounded-2xl p-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800">24</h3>
            <p className="text-sm text-[#6d4b59] mt-1">Projects</p>
          </div>

          <div className="bg-[#fff7fb] border border-pink-100 rounded-2xl p-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800">12k</h3>
            <p className="text-sm text-[#6d4b59] mt-1">Followers</p>
          </div>

          <div className="bg-[#fff7fb] border border-pink-100 rounded-2xl p-4 text-center">
            <h3 className="text-2xl font-bold text-gray-800">4.9</h3>
            <p className="text-sm text-[#6d4b59] mt-1">Rating</p>
          </div>
        </div>

        <div className="border-t border-pink-100 my-6" />

        <div className="space-y-5">
          <div className="flex items-center gap-4 bg-[#fff7fb] border border-pink-100 rounded-2xl p-2">
            <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
              <Mail size={20} className="text-pink-500" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-gray-700 font-medium break-all">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#fff7fb] border border-pink-100 rounded-2xl p-2">
            <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
              <Phone size={20} className="text-pink-500" />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-400">Phone</p>

              {edit ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border-2 border-pink-300 bg-white px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-700 font-medium">{profile.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 bg-[#fff7fb] border border-pink-100 rounded-2xl p-2">
            <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
              <MapPin size={20} className="text-pink-500" />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-400">Location</p>

              {edit ? (
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border-2 border-pink-300 bg-white px-4 py-3 outline-none focus:border-pink-500"
                />
              ) : (
                <p className="text-gray-700 font-medium">{profile.location}</p>
              )}
            </div>
          </div>
        </div>

        {edit && (
          <button
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 py-4 text-white font-semibold hover:scale-[1.01] transition
            "
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}
