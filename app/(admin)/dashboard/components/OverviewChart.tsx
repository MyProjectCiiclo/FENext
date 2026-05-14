"use client";

import { useMemo } from "react";

export default function ActivityChart() {
  const contributions = [
    { date: "Mon", value: 2 },
    { date: "Tue", value: 6 },
    { date: "Wed", value: 4 },
    { date: "Thu", value: 9 },
    { date: "Fri", value: 7 },
    { date: "Sat", value: 12 },
    { date: "Sun", value: 8 },
  ];

  const chartPoints = useMemo(() => {
    if (!contributions.length) return [];

    const max = Math.max(...contributions.map((d) => d.value), 1);
    const stepX = 900 / (contributions.length - 1 || 1);

    return contributions.map((d, i) => ({
      x: i * stepX,
      y: 200 - (d.value / max) * 180,
    }));
  }, [contributions]);

  const linePoints = useMemo(() => {
    if (!chartPoints.length) return "";
    return chartPoints.map((p) => `${p.x},${p.y}`).join(" ");
  }, [chartPoints]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-10">
      <h3 className="text-sm font-semibold text-gray-900">
        Activity Overview
      </h3>

      <p className="text-xs text-gray-500 mt-1 mb-5">
        GitHub contributions activity
      </p>

      <div className="relative h-[220px] border-b border-l border-gray-300 ml-6 mr-4">
        <div className="absolute left-0 right-0 border-t border-dashed border-gray-200 top-[20%]" />
        <div className="absolute left-0 right-0 border-t border-dashed border-gray-200 top-[40%]" />
        <div className="absolute left-0 right-0 border-t border-dashed border-gray-200 top-[60%]" />
        <div className="absolute left-0 right-0 border-t border-dashed border-gray-200 top-[80%]" />

        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth={2}
            points={linePoints}
          />

          {chartPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="#2563eb"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}