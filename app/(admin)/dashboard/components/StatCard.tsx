"use client";

import { Users, Eye, TrendingUp, Trophy } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  growth: string;
  color: "blue" | "orange" | "green" | "purple";
  icon: "users" | "eye" | "chart" | "trophy";
};

export default function StatCard({
  title,
  value,
  growth,
  color,
  icon,
}: Props) {
  const iconMap = {
    users: Users,
    eye: Eye,
    chart: TrendingUp,
    trophy: Trophy,
  };

  const Icon = iconMap[icon];

  const bgColorMap = {
    blue: "bg-blue-600",
    orange: "bg-orange-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 h-[110px] flex justify-between items-start">
      <div className="pt-1">
        <p className="text-[11px] text-gray-500 mb-2">{title}</p>

        <h2 className="text-[30px] leading-none font-bold text-gray-900">
          {value}
        </h2>

        <p className="text-[11px] text-blue-600 mt-2">{growth}</p>
      </div>

      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center text-white mt-1 ${bgColorMap[color]}`}
      >
        {Icon && <Icon size={14} />}
      </div>
    </div>
  );
}