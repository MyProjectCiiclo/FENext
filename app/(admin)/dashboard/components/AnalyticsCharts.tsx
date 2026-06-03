"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { useSkill } from "@/hooks/useSkill";
import { useWork } from "@/hooks/useWork";
import { Skill } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function AnalyticsCharts() {
  const { skills } = useSkill();
  const { work } = useWork();

  const [hovered, setHovered] = useState<null | {
    name: string;
    percent: number;
  }>(null);

  const safeSkills: Skill[] = Array.isArray(skills) ? skills : [];

  const mergedSkills = Object.values(
    safeSkills.reduce(
      (acc, skill) => {
        const key = skill.name.toLowerCase().trim();

        if (!acc[key]) {
          acc[key] = { ...skill };
        } else {
          acc[key].weight = (acc[key].weight || 1) + (skill.weight || 1);
        }

        return acc;
      },
      {} as Record<string, Skill>,
    ),
  );

  const totalWeight = mergedSkills.reduce((sum, s) => sum + (s.weight || 1), 0);

  const normalizedSkills = mergedSkills.map((s) => ({
    ...s,
    percent: totalWeight ? ((s.weight || 1) / totalWeight) * 100 : 0,
  }));

  let current = 0;

  const gradient = normalizedSkills.length
    ? normalizedSkills
        .map((skill) => {
          const start = current;
          const end = current + skill.percent;
          current = end;
          return `${skill.color} ${start}% ${end}%`;
        })
        .join(",")
    : "";

  const workData = Array.isArray(work)
    ? work.map((item) => ({
        year: item.year,
        totalProjects: item.total,
      }))
    : [];


  return (
    <section id="analytics-charts">
      <div className="flex gap-6 mt-6">
        <div className="border border-pink-100 rounded-xl p-4 flex-1 flex flex-col">
          <div>
            <h3 className="text-pink-400 font-bold text-xl">
              SKILL DISTRIBUTION
            </h3>
            <p className="text-gray-400 italic text-sm">
              Overall development performance
            </p>
          </div>

          <div className="relative flex flex-col items-center mt-6 flex-1">
            <div
              className="w-[210px] h-[210px] rounded-full"
              style={{
                background: gradient
                  ? `conic-gradient(${gradient})`
                  : "#e5e7eb",
              }}
            />

            <div className="absolute inset-0 flex">
              {normalizedSkills.map((skill) => (
                <div
                  key={skill.name}
                  style={{ flex: 1 }}
                  onMouseEnter={() =>
                    setHovered({
                      name: skill.name,
                      percent: Math.round(skill.percent),
                    })
                  }
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </div>

            {hovered && (
              <div className="absolute top-10 bg-black text-white text-xs px-2 py-1 rounded">
                {hovered.name}: {hovered.percent}%
              </div>
            )}

            <div className="text-sm mt-5 flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {normalizedSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: skill.color }}
                  />
                  <span className="whitespace-nowrap">
                    {skill.name}: {Math.round(skill.percent)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-pink-100 rounded-xl p-4 flex-1 flex flex-col">
          <div>
            <h3 className="text-pink-400 font-bold text-xl">WORK EXPERIENCE</h3>
            <p className="text-gray-400 italic text-sm">
              Total projects by year
            </p>
          </div>

          <div className="w-full h-[300px] mt-6 flex-1">
            <ResponsiveContainer>
              <BarChart data={workData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="totalProjects"
                  fill="#ec4899"
                  name="Total Projects"
                  radius={[6, 6, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
