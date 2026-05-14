export default function AnalyticsCharts() {
  return (
    <div
    id="analytics-charts" 
    className="flex gap-6 mt-6">
      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900">
          Browser Distribution
        </h3>
        <p className="text-xs text-gray-500 mt-1">Your audience by browser</p>

        <div className="relative h-[170px] mt-6 flex items-center justify-center">
          <div
            className="w-[100px] h-[100px] rounded-full border border-gray-300 relative overflow-hidden"
            style={{
              background:
                "conic-gradient(#000 0% 45%, #111 45% 75%, #000 75% 90%, #111 90% 100%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-gray-300 origin-bottom -translate-x-1/2 -translate-y-1/2 rotate-0"></div>
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-gray-300 origin-bottom -translate-x-1/2 -translate-y-1/2 rotate-[108deg]"></div>
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-gray-300 origin-bottom -translate-x-1/2 -translate-y-1/2 rotate-[270deg]"></div>
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-gray-300 origin-bottom -translate-x-1/2 -translate-y-1/2 rotate-[324deg]"></div>
          </div>

          <span className="absolute top-0 left-[52%] text-xs text-gray-700">
            Chrome 45%
          </span>
          <span className="absolute left-[18%] top-[58%] text-xs text-gray-700">
            Firefox 30%
          </span>
          <span className="absolute left-[61%] top-[68%] text-xs text-gray-700">
            Safari 15%
          </span>
          <span className="absolute right-[20%] top-[48%] text-xs text-gray-700">
            Other 10%
          </span>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-900">
          Performance Metrics
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Weekly performance vs target
        </p>

        <div className="relative mt-6 h-[170px] border-l border-b border-gray-300 ml-8 mr-4">
          <div className="absolute inset-0">
            <div className="absolute w-full border-t border-dashed border-gray-200 top-[20%]"></div>
            <div className="absolute w-full border-t border-dashed border-gray-200 top-[40%]"></div>
            <div className="absolute w-full border-t border-dashed border-gray-200 top-[60%]"></div>
            <div className="absolute w-full border-t border-dashed border-gray-200 top-[80%]"></div>
          </div>

          <div className="absolute bottom-0 left-8 flex gap-12 items-end h-full">
            <div className="flex gap-1 items-end">
              <div className="w-10 h-[86px] bg-blue-700 rounded-t-md"></div>
              <div className="w-10 h-[92px] bg-orange-700 rounded-t-md"></div>
            </div>

            <div className="flex gap-1 items-end">
              <div className="w-10 h-[90px] bg-blue-700 rounded-t-md"></div>
              <div className="w-10 h-[92px] bg-orange-700 rounded-t-md"></div>
            </div>

            <div className="flex gap-1 items-end">
              <div className="w-10 h-[95px] bg-blue-700 rounded-t-md"></div>
              <div className="w-10 h-[92px] bg-orange-700 rounded-t-md"></div>
            </div>

            <div className="flex gap-1 items-end">
              <div className="w-10 h-[98px] bg-blue-700 rounded-t-md"></div>
              <div className="w-10 h-[92px] bg-orange-700 rounded-t-md"></div>
            </div>
          </div>

          <span className="absolute -left-6 top-[72%] text-xs text-gray-500">
            25
          </span>
          <span className="absolute -left-6 top-[50%] text-xs text-gray-500">
            50
          </span>
          <span className="absolute -left-6 top-[28%] text-xs text-gray-500">
            75
          </span>
          <span className="absolute -left-6 top-[0%] text-xs text-gray-500">
            100
          </span>
        </div>
        <div className="flex justify-around text-xs text-gray-500 mt-2 ml-12 mr-4">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>

        <div className="flex justify-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1 text-blue-700">
            <span className="w-2 h-2 bg-blue-700"></span>
            performance
          </div>

          <div className="flex items-center gap-1 text-orange-700">
            <span className="w-2 h-2 bg-orange-700"></span>
            target
          </div>
        </div>
      </div>
    </div>
  );
}
