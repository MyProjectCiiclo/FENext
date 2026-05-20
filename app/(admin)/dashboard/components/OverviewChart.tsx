"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", contributions: 120 },
  { month: "Feb", contributions: 80 },
  { month: "Mar", contributions: 150 },
  { month: "Apr", contributions: 100 },
  { month: "May", contributions: 170 },
  { month: "Jun", contributions: 140 },
];

export default function OverviewChart() {
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
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563EB" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}