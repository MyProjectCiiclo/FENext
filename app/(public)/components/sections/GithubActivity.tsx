"use client";

import { useGithub } from "@/hooks/useGithub";
import { useEffect } from "react";

export default function GithubActivity() {
  const { loading, githubUser, contributions, getGithub } = useGithub();

  useEffect(() => {
    getGithub();
  }, []);

  const weeks = contributions?.weeks ?? [];

  const monthLabels: { month: string; index: number }[] = [];

  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays?.[0];
    if (!firstDay) return;

    const date = new Date(firstDay.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (
      monthLabels.length === 0 ||
      monthLabels[monthLabels.length - 1].month !== month
    ) {
      monthLabels.push({ month, index });
    }
  });

  return (
    <section className="bg-[#FDF0F5] px-6 lg:px-[180px] py-12 flex justify-center">
      <div className="w-full">
        <div className="flex justify-center mb-10">
          <div className="relative bg-[#f8d9e5] text-pink-500 px-6 py-2 rounded-xl font-semibold">
            Github Activity
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4" />
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4" />
          </div>
        </div>

        <div className="flex justify-between mb-10 text-[#6d4b59]">
          <p>Tracking my coding journey</p>

          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-2xl text-pink-500 font-bold">
                {githubUser?.public_repos ?? 0}
              </p>
              <p className="text-xs">PROJECTS</p>
            </div>

            <div className="w-px h-10 bg-gray-300" />

            <div className="text-right">
              <p className="text-2xl text-pink-500 font-bold">
                {contributions?.total ?? 0}
              </p>
              <p className="text-xs">CONTRIBUTIONS</p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-[#6d4b59]">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-flow-col mb-2">
                {weeks.map((_, i) => {
                  const label = monthLabels.find((m) => m.index === i);

                  return (
                    <div key={i} className="w-4 text-[10px] text-gray-500">
                      {label ? label.month : ""}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-[4px]">
                {weeks.map((week, wi) =>
                  week.contributionDays.map((day, di) => {
                    let bg = "#ebedf0";

                    if (day.contributionCount > 0) bg = "#f9a8d4";
                    if (day.contributionCount > 2) bg = "#f472b6";
                    if (day.contributionCount > 4) bg = "#ec4899";

                    return (
                      <div
                        key={`${wi}-${di}`}
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: bg }}
                        title={`${day.date} - ${day.contributionCount}`}
                      />
                    );
                  }),
                )}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
                <span>Less</span>

                <div className="w-3 h-3 rounded-sm bg-[#ebedf0]" />
                <div className="w-3 h-3 rounded-sm bg-[#f9a8d4]" />
                <div className="w-3 h-3 rounded-sm bg-[#f472b6]" />
                <div className="w-3 h-3 rounded-sm bg-[#ec4899]" />

                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}