// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Pencil, Camera, Phone, MapPin } from "lucide-react";
// import type React from "react";

// import { useProfile } from "@/hooks/useProfile";
// import { useGithub } from "@/hooks/useGithub";
// import { useRating } from "@/hooks/useRating";
// import { useContact } from "@/hooks/useContact";
// import LoadingSpinner from "@/shared/Loading";

// export default function AdminProfileInfo() {
//   const [editMode, setEditMode] = useState(false);

//   const { profile, getProfile, updateProfile } = useProfile();
//   const { githubUser, getGithub } = useGithub();
//   const { ratings, getRating } = useRating();
//   const { totalContacts, getContact } = useContact();

//   const fileRef = useRef<HTMLInputElement | null>(null);

//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     full_name: "",
//     title: "",
//     description: "",
//     phone: "",
//     location: "",
//     avatar: "",
//   });

//   useEffect(() => {
//     getProfile();
//     getGithub();
//     getRating();
//     getContact();
//   }, []);

//   useEffect(() => {
//     if (!profile) return;

//     setForm({
//       full_name: profile.full_name || "",
//       title: profile.title || "",
//       description: profile.description || "",
//       phone: profile.phone || "",
//       location: profile.location || "",
//       avatar: profile.avatar || "",
//     });
//   }, [profile]);

//   useEffect(() => {
//     return () => {
//       if (avatarPreview) {
//         URL.revokeObjectURL(avatarPreview);
//       }
//     };
//   }, [avatarPreview]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setAvatarFile(file);
//     setAvatarPreview(URL.createObjectURL(file));
//   };

//   const handleAvatarClick = () => {
//     fileRef.current?.click();
//   };

//   const getImage = (img: string | File | null) => {
//     if (!img) return "/default-project.png";

//     if (img instanceof File) {
//       return URL.createObjectURL(img);
//     }

//     if (typeof img === "string") {
//       const clean = img.trim();

//       if (!clean || clean === "null" || clean === "undefined") {
//         return "/default-project.png";
//       }

//       if (clean.startsWith("http") || clean.startsWith("/")) {
//         return clean;
//       }
//     }

//     return "/default-project.png";
//   };

//   const avatarSrc = avatarPreview || getImage(profile?.avatar ?? null);

//   const handleSave = async () => {
//     const formData = new FormData();

//     formData.append("full_name", form.full_name);
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("phone", form.phone);
//     formData.append("location", form.location);

//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     await updateProfile(formData);
//     await getProfile();

//     setEditMode(false);
//     setAvatarFile(null);
//     setAvatarPreview(null);
//   };

//   const totalProjects = githubUser?.public_repos ?? 0;

//   const avgRating =
//     ratings.length > 0
//       ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
//       : 0;

//   const renderStars = (value: number) => {
//     const r = Math.round(value);

//     return Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={i < r ? "text-yellow-400" : "text-pink-200"}>
//         ★
//       </span>
//     ));
//   };

//   if(!profile) {
//     return <LoadingSpinner />;
//   }
//   return (
//     <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm">
//       <div className="h-32 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

//       <button
//         onClick={() => setEditMode(!editMode)}
//         className="absolute top-5 right-5 z-30 flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 px-5 py-2 text-white backdrop-blur-sm"
//       >
//         <Pencil size={18} />
//         {editMode ? "Close Edit" : "Edit Profile"}
//       </button>

//       <input
//         ref={fileRef}
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={onAvatarChange}
//       />

//       <div className="relative px-8 pb-8 pt-24">
//         <div className="absolute left-8 -top-16 z-20">
//           <div className="relative">
//             <div className="h-32 w-32 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-2xl">
//               <Image
//                 src={avatarSrc}
//                 alt="avatar"
//                 width={140}
//                 height={140}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <button
//               onClick={handleAvatarClick}
//               className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-pink-500 text-white shadow-lg"
//             >
//               <Camera size={16} />
//             </button>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-pink-100 bg-pink-50 p-6 pt-16">
//           {editMode ? (
//             <input
//               name="full_name"
//               value={form.full_name}
//               onChange={handleChange}
//               className="w-full rounded-2xl border-2 border-pink-200 bg-white px-4 py-3 text-2xl font-bold"
//             />
//           ) : (
//             <h2 className="text-3xl font-bold text-gray-800">
//               {form.full_name}
//             </h2>
//           )}

//           <div className="mt-4">
//             {editMode ? (
//               <input
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="w-full rounded-2xl border-2 border-pink-200 bg-white px-4 py-3"
//               />
//             ) : (
//               <p className="text-lg font-semibold text-pink-500">
//                 {form.title}
//               </p>
//             )}
//           </div>

//           <div className="mt-4">
//             {editMode ? (
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full rounded-2xl border-2 border-pink-200 bg-white px-4 py-3"
//               />
//             ) : (
//               <p className="leading-7 text-gray-600">{form.description}</p>
//             )}
//           </div>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
//           <div className="rounded-2xl bg-pink-50 p-5 text-center">
//             <p className="text-sm text-pink-400">Projects</p>
//             <h3 className="mt-2 text-3xl font-bold text-pink-600">
//               {totalProjects}
//             </h3>
//           </div>

//           <div className="rounded-2xl bg-pink-50 p-5 text-center">
//             <div className="flex justify-center text-2xl">
//               {renderStars(avgRating)}
//             </div>
//             <h3 className="mt-2 text-2xl font-bold text-pink-600">
//               {avgRating.toFixed(1)} / 5
//             </h3>
//           </div>

//           <div className="rounded-2xl bg-pink-50 p-5 text-center">
//             <p className="text-sm text-pink-400">Contacts</p>
//             <h3 className="mt-2 text-3xl font-bold text-pink-600">
//               {totalContacts}
//             </h3>
//           </div>
//         </div>

//         <div className="mt-8 space-y-5">
//           <div className="flex gap-4 rounded-2xl bg-pink-50 p-5">
//             <Phone className="text-pink-500" />
//             <div className="w-full">
//               <p className="text-sm text-pink-400">Phone</p>
//               {editMode ? (
//                 <input
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="mt-2 w-full rounded-2xl border px-4 py-3"
//                 />
//               ) : (
//                 <p>{form.phone}</p>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-4 rounded-2xl bg-pink-50 p-5">
//             <MapPin className="text-pink-500" />
//             <div className="w-full">
//               <p className="text-sm text-pink-400">Location</p>
//               {editMode ? (
//                 <input
//                   name="location"
//                   value={form.location}
//                   onChange={handleChange}
//                   className="mt-2 w-full rounded-2xl border px-4 py-3"
//                 />
//               ) : (
//                 <p>{form.location}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {editMode && (
//           <button
//             onClick={handleSave}
//             className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 py-4 font-semibold text-white"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }





























////////////////////////////////


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
  const { githubUser, getGithub } = useGithub();
  const { ratings, getRating } = useRating();
  const { totalContacts, getContact } = useContact();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const avatarSrc =
    avatarPreview ||
    profile?.avatar ||
    "/default-project.png";

  if (!profile) return <LoadingSpinner />;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-sm">

      <div className="h-32 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <button
        onClick={() => setEditMode((v) => !v)}
        className="absolute top-5 right-5 z-30 flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-2 text-white backdrop-blur-sm"
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

        {/* avatar */}
        <div className="absolute left-8 -top-16">
          <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={avatarSrc}
              alt="avatar"
              width={140}
              height={140}
              className="object-cover w-full h-full"
            />
          </div>

          {editMode && (
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full"
            >
              <Camera size={14} />
            </button>
          )}
        </div>

        {/* info */}
        <div className="mt-16 space-y-4">

          {editMode ? (
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="input"
            />
          ) : (
            <h2 className="text-2xl font-bold">{form.full_name}</h2>
          )}

          {editMode ? (
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input"
            />
          ) : (
            <p className="text-pink-500">{form.title}</p>
          )}

          {editMode ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input"
            />
          ) : (
            <p>{form.description}</p>
          )}

          {/* phone */}
          <div className="flex gap-2 items-center">
            <Phone />
            {editMode ? (
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input"
              />
            ) : (
              <p>{form.phone}</p>
            )}
          </div>

          {/* location */}
          <div className="flex gap-2 items-center">
            <MapPin />
            {editMode ? (
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="input"
              />
            ) : (
              <p>{form.location}</p>
            )}
          </div>
        </div>

        {editMode && (
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-pink-500 text-white py-3 rounded-xl"
          >
            Save Changes
          </button>
        )}
      </div>
    </section>
  );
}