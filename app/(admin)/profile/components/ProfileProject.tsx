"use client";

import { useState } from "react";
import Image from "next/image";
// import { AdminProfileSidebar } from ".";

export default function ProfileProject() {
  const [profile, setProfile] = useState({
    full_name: "Jordan Mitchell",
    title: "Full Stack Developer",
    description:
      "I specialize in creating scalable, user-friendly web applications.",

    email: "hokimthanh1234@gmail.com",
    phone: "+84 335 044 593",
    location: "Da Nang, Vietnam",

    github: "github.com/KimThanh1801",
    linkedin: "linkedin.com/in/ho-thi-kim-thanh/",
    website: "portfolio.com",

    avatar: "/image-personal.png",
    cv_url: "cv.pdf",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* <AdminProfileSidebar/> */}
      <div className="flex-1 h-screen overflow-y-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
                <Image
                  src={profile.avatar}
                  alt="avatar"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-3xl font-bold mt-5">{profile.full_name}</h1>

              <p className="text-blue-600 font-semibold mt-2">
                {profile.title}
              </p>

              <p className="text-gray-500 text-center mt-4">
                {profile.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Github</p>
                <p className="font-medium">{profile.github}</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Linkedin</p>
                <p className="font-medium">{profile.linkedin}</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-400 text-sm">Website</p>
                <p className="font-medium">{profile.website}</p>
              </div>
            </div>

            <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold">
              Download CV
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

            <div className="space-y-5">
              <input
                type="text"
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500 h-32 resize-none"
              />

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="Github"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="Linkedin"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="website"
                value={profile.website}
                onChange={handleChange}
                placeholder="Website"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="avatar"
                value={profile.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="cv_url"
                value={profile.cv_url}
                onChange={handleChange}
                placeholder="CV URL"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
