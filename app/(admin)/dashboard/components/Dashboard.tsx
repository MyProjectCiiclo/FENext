"use client";

import { useGithub } from "@/hooks/useGithub";
import { useSkill } from "@/hooks/useSkill";
import { Users, Eye, BarChart3, Trophy } from "lucide-react";
import { useContact } from "@/hooks/useContact";

type StatCardProps = {
  title: string;
  value: string | number;
  color: "blue" | "orange" | "green" | "purple";
  icon: "users" | "eye" | "chart" | "trophy";
};

function StatCard({ title, value, color, icon }: StatCardProps) {
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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[180px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorMap[color]}`}
        >
          {iconMap[icon]}
        </div>
      </div>
    </div>
  );
}

export default function StatCards() {
  const { githubUser } = useGithub();
  const { skills } = useSkill();
  const { contacts } = useContact();

  const projects = githubUser?.public_repos ?? 0;
  const totalSkills = skills?.length ?? 0; 
  const totalContacts = contacts?.length ?? 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="TOTAL USERS" value="2,547" color="blue" icon="users" />

      <StatCard
        title="CONTACTS"
        value={totalContacts}
        color="orange"
        icon="eye"
      />

      <StatCard
        title="SKILLS"
        value={totalSkills}
        color="green"
        icon="chart"
      />

      <StatCard
        title="PROJECTS"
        value={projects}
        color="purple"
        icon="trophy"
      />
    </div>
  );
}