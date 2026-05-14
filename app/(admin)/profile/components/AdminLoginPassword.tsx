"use client";

import { useState } from "react";
import { Pencil, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const [openUpdate, setOpenUpdate] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const profile = {
    email: "hokimthanh1234@gmail.com",
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div
          className="
            bg-white
            rounded-[30px]
            border
            border-pink-100
            shadow-sm
            p-10
            relative
            overflow-hidden
          "
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30" />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-pink-400">
                  Login & Password
                </h2>

                <p className="text-[#6d4b59] italic mt-4 text-lg">
                  Update your login information and secure your account.
                </p>
              </div>

              <button
                onClick={() => setOpenUpdate(!openUpdate)}
                className="
                  border border-pink-400
                  text-pink-500
                  px-6 py-3
                  rounded-2xl
                  flex items-center gap-3
                  hover:bg-pink-500
                  hover:text-white
                  transition
                "
              >
                <Pencil size={18} />

                {openUpdate ? "Close" : "Update"}
              </button>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-center">
                <p className="text-pink-400 text-sm font-medium w-40">
                  EMAIL ADDRESS
                </p>

                <h3 className="text-lg font-semibold text-[#6d4b59]">
                  {profile.email}
                </h3>
              </div>

              <div className="flex items-center">
                <p className="text-pink-400 text-sm font-medium w-40">
                  PASSWORD
                </p>

                <h3 className="text-lg font-semibold text-[#6d4b59]">
                  ••••••••••
                </h3>

                <div className="ml-auto text-right text-gray-400 text-sm">
                  Last updated 2 days ago
                </div>
              </div>

              {openUpdate && (
                <div
                  className="
                    mt-4
                    rounded-3xl
                    border
                    border-pink-100
                    bg-pink-50/40
                    p-4
                    animate-in
                    fade-in
                    slide-in-from-top-3
                    duration-300
                  "
                >
                  <div className="grid grid-cols-1 mb-2">
                    <div>
                      <label className="block text-pink-500 font-semibold mb-3">
                        Email
                      </label>

                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          placeholder="Enter new email"
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-pink-100
                            bg-white
                            px-5
                            py-4
                            pr-14
                            outline-none
                            focus:border-pink-400
                          "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-pink-500 font-semibold mb-3">
                        Current Password
                      </label>

                      <div className="relative">
                        <input
                          type={showCurrent ? "text" : "password"}
                          placeholder="Enter current password"
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-pink-100
                            bg-white
                            px-5
                            py-4
                            pr-14
                            outline-none
                            focus:border-pink-400
                          "
                        />

                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                          "
                        >
                          {showCurrent ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-pink-500 font-semibold mb-3">
                        New Password
                      </label>

                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          placeholder="Enter new password"
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-pink-100
                            bg-white
                            px-5
                            py-4
                            pr-14
                            outline-none
                            focus:border-pink-400
                          "
                        />

                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                          "
                        >
                          {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      className="
                        px-8
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-pink-500
                        to-rose-400
                        text-white
                        font-semibold
                        hover:scale-[1.01]
                        transition
                      "
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
