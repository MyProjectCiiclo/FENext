"use client";

import { useRating } from "@/hooks";

export default function RatingSection() {
  const { ratings } = useRating();

  return (
    <section
      id="rating"
      className="bg-[#FDF0F5]/90 px-6 py-16 lg:px-[180px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            What People Say About Me
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            Testimonials
          </h2>

          <p className="text-[#6d4b59] max-w-3xl mx-auto leading-8">
            People I’ve worked with sharing their feedback about my work,
            skills, and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ratings?.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-white/70 backdrop-blur-md border border-pink-100 rounded-[24px] p-6 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-[#6d4b59] mb-3">
                {item.name}
              </h3>

              <p className="text-[#7b5a68] text-sm leading-6">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}