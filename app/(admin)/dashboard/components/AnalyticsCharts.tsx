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

export default function AnalyticsCharts() {
  const [hovered, setHovered] = useState<null | {
    name: string;
    percent: number;
  }>(null);

  const skills = [
    { name: "React", percent: 30, color: "#f472b6" },
    { name: "Next.js", percent: 25, color: "#ec4899" },
    { name: "JavaScript", percent: 25, color: "#fb7185" },
    { name: "TypeScript", percent: 20, color: "#f9a8d4" },
  ];

  const data = [
    { years: "years 1", performance: 55, totalProjects: 65 },
    { years: "years 2", performance: 60, totalProjects: 62 },
    { years: "years 3", performance: 65, totalProjects: 63 },
    { years: "years 4", performance: 70, totalProjects: 60 },
  ];

  let current = 0;

  const gradient = skills
    .map((skill) => {
      const start = current;
      const end = current + skill.percent;

      current = end;

      return `${skill.color} ${start}% ${end}%`;
    })
    .join(",");

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
                background: `conic-gradient(${gradient})`,
              }}
            />

            <div className="absolute inset-0 flex">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{ flex: skill.percent }}
                  onMouseEnter={() =>
                    setHovered({
                      name: skill.name,
                      percent: skill.percent,
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
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: skill.color,
                    }}
                  />

                  <span className="whitespace-nowrap">
                    {skill.name}: {skill.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-pink-100 rounded-xl p-4 flex-1 flex flex-col">
          <div>
            <h3 className="text-pink-400 font-bold text-xl">
              Project Overview (By Year)
            </h3>

            <p className="text-gray-400 italic text-sm">
              Number of projects completed each year
            </p>
          </div>

          <div className="w-full h-[300px] mt-6 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="years" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="performance"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="totalProjects"
                  fill="#dc2626"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}