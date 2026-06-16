"use client";

import { useMemo } from "react";
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
import { ContributionWeek } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function OverviewChart() {
  const { contributions, loading } = useGithub();

  const chartData = useMemo(() => {
    if (!contributions?.weeks) return [];

    return contributions.weeks.flatMap((week: ContributionWeek) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        contributions: day.contributionCount,
      }))
    );
  }, [contributions]);

  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 border border-pink-100 rounded-2xl bg-white/60 backdrop-blur-md">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#6d4b59]">
          Activity Overview
        </h3>

        <p className="text-xs text-[#7b5a68] mt-1">
          GitHub contributions activity
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3d4e2"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickFormatter={(value: string) => value.slice(5)}
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#ec4899"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}