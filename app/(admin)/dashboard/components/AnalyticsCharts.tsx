"use client";

export default function AnalyticsCharts() {
  const skills = [
    {
      name: "React",
      percent: 92,
      color: "#f472b6",
    },
    {
      name: "Next.js",
      percent: 88,
      color: "#ec4899",
    },
    {
      name: "JavaScript",
      percent: 85,
      color: "#fb7185",
    },
    {
      name: "TypeScript",
      percent: 80,
      color: "#f9a8d4",
    },
  ];
  const percent = 92;

  const radius = 70;
  const stroke = 12;

  const normalizedRadius = radius - stroke / 2;

  return (
    <div className="flex gap-6 mt-6">
      <div className="border-1 border border-pink-100 rounded-xl p-4 flex-1">
        <h3 className="text-pink-400 font-bold text-xl">SKILL PROGRESS</h3>
        <p className="text-[#6d4b5p] italic text-sm">
          Overall development performance
        </p>
        <div className="relative w-[180px] h-[180px] flex items-center justify-center">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            className="rotate-[-90deg] block mx-auto"
          >
            <circle
              cx="90"
              cy="90"
              r={normalizedRadius}
              stroke="#fce7f3"
              strokeWidth={stroke}
              fill="none"
            />

         
          </svg>
        </div>
      </div>
      <div className="border-1 border border-pink-100 rounded-xl p-4 flex-1">
        Right
      </div>
    </div>
  );
}
