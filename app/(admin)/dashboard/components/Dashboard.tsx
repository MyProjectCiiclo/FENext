"use client";

import {
  Users,
  Eye,
  BarChart3,
  Trophy,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  growth: string;
  color: "blue" | "orange" | "green" | "purple";
  icon: "users" | "eye" | "chart" | "trophy";
  className?: string;
};

function StatCard({
  title,
  value,
  growth,
  color,
  icon,
  className,
}: StatCardProps) {
  const iconMap = {
    users: <Users size={22} />,
    eye: <Eye size={22} />,
    chart: <BarChart3 size={22} />,
    trophy: <Trophy size={22} />,
  };

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        border-gray-100
        flex
        flex-col
        justify-between
        min-h-[180px]
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            ${colorMap[color]}
          `}
        >
          {iconMap[icon]}
        </div>
      </div>

      <p className="text-sm text-green-500 font-medium mt-6">
        {growth}
      </p>
    </div>
  );
}

export default function StatCards() {
  const projects = 42;
  const monthTotal = 128;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        className="flex-1"
        title="TOTAL"
        value="2,547"
        growth="+12% this month"
        color="blue"
        icon="users"
      />

      <StatCard
        className="flex-1"
        title="CONTACT"
        value="18,394"
        growth="+8% this month"
        color="orange"
        icon="eye"
      />

      <StatCard
        className="flex-1"
        title="SKILLS"
        value="6.8%"
        growth="+2.4% this month"
        color="green"
        icon="chart"
      />

      <StatCard
        className="flex-1"
        title="PROJECT"
        value={projects}
        growth={`+${monthTotal} this month`}
        color="purple"
        icon="trophy"
      />
    </div>
  );
}