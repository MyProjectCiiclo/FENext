export default function GithubActivity() {
  const weeks = Array.from({ length: 20 }, () =>
    Array.from({ length: 7 }, () => ({
      color: ["#fce7f3", "#f9a8d4", "#f472b6", "#ec4899"][
        Math.floor(Math.random() * 4)
      ],
    })),
  );

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <section
      id="github"
      className="bg-[#FDF0F5] text-white px-6 lg:px-[180px] py-12 flex items-center justify-center"
    >
      <div className="w-full">
          <div className="flex justify-center mb-[70px]">
              <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold">
                Github Activity
                <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
                <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
              </div>
            </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
          <div>
          

            <p className="text-[#6d4b59] text-sm mt-2">
              Tracking my coding journey and contributions
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-3xl font-bold text-pink-400">12</p>

              <p className="text-xs text-[#6d4b59] tracking-widest">PROJECTS</p>
            </div>

            <div className="w-px h-10 bg-gray-700 opacity-40"></div>

            <div className="text-right">
              <p className="text-3xl font-bold text-pink-400">356</p>

              <p className="text-xs text-[#6d4b59] tracking-widest">
                CONTRIBUTIONS
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-[4px] mb-3 pl-8">
            {monthNames.map((month, index) => (
              <span key={index} className="text-xs text-[#6d4b59] w-[52px]">
                {month}
              </span>
            ))}
          </div>

          <div className="flex gap-[4px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[4px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="w-5 h-5 rounded-sm transition-all duration-200 hover:scale-125 hover:shadow-lg cursor-pointer"
                    style={{
                      backgroundColor: day.color,
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 mt-6 text-xs text-[#6d4b59]">
          <span>Less</span>

          <div className="flex gap-[3px]">
            <div className="w-3 h-3 bg-[#fce7f3] rounded-sm"></div>

            <div className="w-3 h-3 bg-[#f9a8d4] rounded-sm"></div>

            <div className="w-3 h-3 bg-[#f472b6] rounded-sm"></div>

            <div className="w-3 h-3 bg-[#ec4899] rounded-sm"></div>
          </div>

          <span>More</span>
        </div>
      </div>
    </section>
  );
}
