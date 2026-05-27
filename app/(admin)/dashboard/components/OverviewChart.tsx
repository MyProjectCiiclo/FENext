"use client";

import { useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useGithub } from "@/hooks/useGithub";

export default function OverviewChart() {
  const { contributions, getGithub } = useGithub();

  useEffect(() => {
    getGithub();
  }, []);

  const chartData = useMemo(() => {
    if (!contributions?.weeks) return [];

    return contributions.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        contributions: day.contributionCount,
      }))
    );
  }, [contributions]);

  return (
    <div className="p-4 border border-pink-100 rounded-xl mt-5">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          Activity Overview
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          GitHub contributions activity
        </p>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => value.slice(5)} // chỉ lấy MM-DD
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}