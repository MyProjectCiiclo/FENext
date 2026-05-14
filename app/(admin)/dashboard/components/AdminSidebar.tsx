"use client";

import Link from "next/link";

import {
  FaChartPie,
  FaUser,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#FDF0F5] text-white flex flex-col justify-between p-4 shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#FDF0F5] p-2 rounded-lg">
            <FaChartPie className="text-pink-400" size={20} />
          </div>

          <div>
            <h1 className="font-bold text-lg text-pink-400">MyDash</h1>
            <p className="text-[#6d4b59]">Profile Manager</p>
          </div>
        </div>

        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaChartPie className="text-pink-400" size={20} />
            <span className="text-[#6d4b59]">Dashboard</span>
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaUser className="text-pink-400" size={20} />
            <span className="text-[#6d4b59]">Profile</span>
          </Link>

          <Link
            href="/dashboard#analytics-charts"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white"
          >
            <FaChartLine className="text-pink-400" size={20} />
            <span className="text-[#6d4b59]">Analytics</span>
          </Link>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white">
            <FaCog className="text-pink-400" size={20} />
            <span className="text-[#6d4b59]">Settings</span>
          </div>
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 border border-[#6d4b59] p-3 rounded-lg mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full">
            <FaUser className="text-pink-400" size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-pink-400">John Doe</p>
            <p className="text-[#6d4b59]">user@example.com</p>
          </div>
        </div>

        <button className="w-full text-pink-400 flex items-center justify-center gap-2 border border-[#6d4b59] py-2 rounded-lg hover:bg-[#FDF0F5] transition">
          <FaSignOutAlt className="text-pink-400" size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
