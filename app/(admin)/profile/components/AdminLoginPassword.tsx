"use client";

import { useState } from "react";
import { Pencil, Eye, EyeOff, User } from "lucide-react";

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const profile = {
    email: "hokimthanh1234@gmail.com",
  };

  return (
    <section
      className="
        bg-white
        rounded-[32px]
        overflow-hidden
        border border-pink-100
        shadow-[0_10px_40px_rgba(255,105,180,0.08)]
        relative
      "
    >
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
          "
        >
          <Pencil size={18} />
          {edit ? "Close Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="px-8 pb-10 relative">
        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <User className="text-pink-500" size={36} />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-6">
          Login & Password
        </h2>

        <p className="text-[#6d4b59] mt-2">
          Update your login information and secure your account.
        </p>

        <div className="mt-8 space-y-5">
          <div className="flex items-center">
            <p className="text-pink-500 text-sm font-medium w-40">
              EMAIL
            </p>
            <p className="text-gray-700 font-semibold">
              {profile.email}
            </p>
          </div>

          <div className="flex items-center">
            <p className="text-pink-500 text-sm font-medium w-40">
              PASSWORD
            </p>
            <p className="text-gray-700 font-semibold">
              ••••••••••
            </p>
          </div>
        </div>

        {edit && (
          <div
            className="
              mt-8
              p-6
              rounded-3xl
              border border-pink-100
              bg-pink-50/30
              space-y-6
            "
          >
            <div>
              <label className="block text-pink-500 font-semibold mb-2">
                Email
              </label>

              <input
                type="text"
                placeholder="Enter new email"
                className="
                  w-full
                  rounded-2xl
                  border-2 border-pink-200
                  bg-white
                  px-4 py-3
                  outline-none
                  focus:border-pink-500
                "
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-pink-500 font-semibold mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Current password"
                    className="
                      w-full
                      rounded-2xl
                      border-2 border-pink-200
                      bg-white
                      px-4 py-3
                      pr-12
                      outline-none
                      focus:border-pink-500
                    "
                  />

                  <button
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showCurrent ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-pink-500 font-semibold mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="New password"
                    className="
                      w-full
                      rounded-2xl
                      border-2 border-pink-200
                      bg-white
                      px-4 py-3
                      pr-12
                      outline-none
                      focus:border-pink-500
                    "
                  />

                  <button
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              className="
                w-full
                mt-2
                rounded-2xl
                bg-gradient-to-r
                from-pink-500
                to-rose-400
                py-4
                text-white
                font-semibold
                hover:scale-[1.01]
                transition
              "
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}