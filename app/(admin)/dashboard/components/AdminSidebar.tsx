"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  FaChartPie,
  FaUser,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaEnvelope,
  FaStar,
  FaTasks,
} from "react-icons/fa";

import { useUser } from "@/hooks/useUser";

type ActiveSection =
  | "dashboard"
  | "profile"
  | "settings"
  | "profileEducation"
  | "cvProjects"
  | "analytics"
  | "management"
  | "contactManagement"
  | "ratingManagement";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  const tab = searchParams.get("tab");

  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const isAnalytics = pathname === "/dashboard" && hash === "#analytics-charts";

  const activeSection: ActiveSection = isAnalytics
    ? "analytics"
    : pathname === "/dashboard"
      ? "dashboard"
      : pathname === "/settings"
        ? "settings"
        : pathname.startsWith("/profile") && tab === "profileEducation"
          ? "profileEducation"
          : pathname.startsWith("/profile") && tab === "cvProjects"
            ? "cvProjects"
            : pathname.startsWith("/profile")
              ? "profile"
              : pathname.startsWith("/management") &&
                  tab === "managementContact"
                ? "contactManagement"
                : pathname.startsWith("/management") &&
                    tab === "managementRating"
                  ? "ratingManagement"
                  : pathname.startsWith("/management")
                    ? "management"
                    : "dashboard";

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      active ? "bg-white shadow-sm" : "hover:bg-white"
    }`;

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
            className={navItemClass(activeSection === "dashboard")}
          >
            <FaChartPie className="text-pink-400" />

            <span className="text-[#6d4b59]">Dashboard</span>
          </Link>

          <Link
            href="/profile"
            className={navItemClass(activeSection === "profile")}
          >
            <FaUser className="text-pink-400" />

            <span className="text-[#6d4b59]">Profile</span>
          </Link>

          {pathname.startsWith("/profile") && (
            <div className="ml-8 space-y-2">
              <Link
                href="/profile"
                className={navItemClass(activeSection === "profile")}
              >
                <FaUser size={14} className="text-pink-400" />

                <span className="text-[#6d4b59]">Personal</span>
              </Link>

              <Link
                href="/profile?tab=profileEducation"
                className={navItemClass(activeSection === "profileEducation")}
              >
                <GraduationCap size={14} className="text-pink-400" />

                <span className="text-[#6d4b59]">Education</span>
              </Link>

              <Link
                href="/profile?tab=cvProjects"
                className={navItemClass(activeSection === "cvProjects")}
              >
                <FaFileAlt size={14} className="text-pink-400" />

                <span className="text-[#6d4b59]">CV & Projects</span>
              </Link>
            </div>
          )}

          <Link
            href="/management"
            className={navItemClass(activeSection === "management")}
          >
            <FaTasks className="text-pink-400" />

            <span className="text-[#6d4b59]">Management</span>
          </Link>

          {pathname.startsWith("/management") && (
            <div className="ml-8 space-y-2">
              <Link
                href="/management?tab=managementContact"
                className={navItemClass(activeSection === "contactManagement")}
              >
                <FaEnvelope size={14} className="text-pink-400" />

                <span className="text-[#6d4b59]">Contact</span>
              </Link>

              <Link
                href="/management?tab=managementRating"
                className={navItemClass(activeSection === "ratingManagement")}
              >
                <FaStar size={14} className="text-pink-400" />

                <span className="text-[#6d4b59]">Rating</span>
              </Link>
            </div>
          )}

          <Link
            href="/dashboard#analytics-charts"
            className={navItemClass(activeSection === "analytics")}
          >
            <FaChartLine className="text-pink-400" size={20} />

            <span className="text-[#6d4b59]">Analytics</span>
          </Link>

          <Link
            href="/settings"
            className={navItemClass(activeSection === "settings")}
          >
            <FaCog className="text-pink-400" />

            <span className="text-[#6d4b59]">Settings</span>
          </Link>
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 border border-[#6d4b59] p-3 rounded-lg mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full">
            <FaUser className="text-pink-400" size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-pink-400">
              {user?.name || "Loading..."}
            </p>

            <p className="text-[#6d4b59] text-sm break-all">
              {user?.email || "Loading..."}
            </p>
          </div>
        </div>

        <button className="w-full text-pink-400 flex items-center justify-center gap-2 border border-[#6d4b59] py-2 rounded-lg hover:bg-[#FDF0F5] transition">
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </div>
    </section>
  );
}
