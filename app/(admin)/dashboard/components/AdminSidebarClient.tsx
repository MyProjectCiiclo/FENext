"use client";

import { Award, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaChartPie,
  FaUser,
  FaChartLine,
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
  | "ratingManagement"
  | "skillManagement";

export default function AdminSidebarClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user, getUser, logout } = useUser();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const tab = searchParams.get("tab");

  const hash =
    typeof window !== "undefined" ? window.location.hash : "";

  const isAnalytics =
    pathname === "/dashboard" &&
    hash === "#analytics-charts";

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
                  : pathname.startsWith("/management") &&
                      tab === "managementSkill"
                    ? "skillManagement"
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
            <h1 className="font-bold text-lg text-pink-400">
              MyDash
            </h1>
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
                Personal
              </Link>

              <Link
                href="/profile?tab=profileEducation"
                className={navItemClass(
                  activeSection === "profileEducation"
                )}
              >
                <GraduationCap size={14} className="text-pink-400" />
                Education
              </Link>

              <Link
                href="/profile?tab=cvProjects"
                className={navItemClass(activeSection === "cvProjects")}
              >
                <FaFileAlt size={14} className="text-pink-400" />
                CV & Projects
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
                className={navItemClass(
                  activeSection === "contactManagement"
                )}
              >
                <FaEnvelope size={14} className="text-pink-400" />
                Contact
              </Link>

              <Link
                href="/management?tab=managementRating"
                className={navItemClass(
                  activeSection === "ratingManagement"
                )}
              >
                <FaStar size={14} className="text-pink-400" />
                Rating
              </Link>

              <Link
                href="/management?tab=managementSkill"
                className={navItemClass(
                  activeSection === "skillManagement"
                )}
              >
                <Award size={14} className="text-pink-400" />
                Skill
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
        </nav>
      </div>

      <div>
        <div className="flex items-center gap-3 border border-[#6d4b59] p-3 rounded-lg mb-4">
          <FaUser className="text-pink-400" size={20} />
          <div>
            <p className="text-sm font-semibold text-pink-400">
              {user?.name || "Loading..."}
            </p>
            <p className="text-[#6d4b59] text-sm break-all">
              {user?.email || "Loading..."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenLogoutModal(true)}
          className="w-full text-pink-400 flex items-center justify-center gap-2 border border-[#6d4b59] py-2 rounded-lg"
        >
          <FaSignOutAlt size={20} />
          Logout
        </button>

        {openLogoutModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Are you sure you want to logout?
              </h2>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() => setOpenLogoutModal(false)}
                  className="w-full py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await logout();
                    setOpenLogoutModal(false);
                  }}
                  className="w-full py-2 bg-pink-400 text-white rounded-lg"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}