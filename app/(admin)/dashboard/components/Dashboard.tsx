"use client";

import StatCard from "./StatCard";

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
