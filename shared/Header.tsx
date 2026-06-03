"use client";

import Link from "next/link";
import Image from "next/image";
import { useProfile } from "@/hooks";

export default function Header() {
  const { profile, loading } = useProfile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f3d8e4] bg-[#FDF0F5]/90 backdrop-blur-xl">
      <div className="mx-auto flex items-center justify-between px-4 lg:px-[180px] py-2">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={profile?.avatar || "/assets/image-personal.png"}
              alt="Avatar"
              fill
              className="object-cover border-2 border-pink-300 shadow-[0_0_20px_rgba(244,114,182,0.35)] group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 rounded-full border-2 border-pink-200 animate-ping opacity-20"></div>
          </div>

          <div>
            <h1 className="text-[#4b2e39] text-[18px] font-bold tracking-wide">
              {loading ? "Loading..." : profile?.full_name}
            </h1>
            <p className="text-[#9b7283] text-[16px]">
              {loading ? "Loading..." : profile?.title}
            </p>
          </div>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-10 text-[16px] font-medium text-[#6d4b59]">
            <li>
              <Link href="/#intro">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#skills">Skills</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 rounded-full bg-pink-400 text-white font-semibold hover:scale-105 transition duration-300">
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-[#6d4b59] text-2xl">☰</button>
      </div>
    </header>
  );
}
