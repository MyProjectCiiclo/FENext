"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  FaChartPie,
  FaUser,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaLock,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const [openProfile, setOpenProfile] = useState(
    pathname.startsWith("/profile"),
  );

  return (
    <section className="w-64 h-screen bg-[#FDF0F5] flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <FaChartPie className="text-pink-400" size={20} />
          <div>
            <h1 className="font-bold text-lg text-pink-400">MyDash</h1>
            <p className="text-[#6d4b59]">Profile Manager</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaChartPie className="text-pink-400" />
            <span className="text-[#6d4b59]">Dashboard</span>
          </Link>

          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaUser className="text-pink-400" />
            <span className="text-[#6d4b59]">Profile</span>
          </button>

          {openProfile && (
            <div className="ml-8 space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white text-[#6d4b59]"
              >
                <FaUser className="text-pink-400" size={14} />
                <span>Personal Information</span>
              </Link>

              <Link
                href="/profile/login"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white text-[#6d4b59]"
              >
                <FaLock className="text-pink-400" size={14} />
                <span>Login & Password</span>
              </Link>

              <Link
                href="/profile/cv"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white text-[#6d4b59]"
              >
                <FaFileAlt className="text-pink-400" size={14} />
                <span>CV & Projects</span>
              </Link>
            </div>
          )}

          <Link
            href="/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaCog className="text-pink-400" />
            <span className="text-[#6d4b59]">Settings</span>
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-2 p-3 text-[#6d4b59] hover:text-pink-400">
        <FaSignOutAlt className="text-pink-400" />
        Logout
      </button>
    </section>
  );
}
