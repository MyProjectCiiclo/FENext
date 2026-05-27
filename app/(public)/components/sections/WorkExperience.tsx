"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useWork } from "@/hooks/useWork";

export default function WorkExperience() {
  const { work, getWork } = useWork();

  useEffect(() => {
    getWork?.();
  }, []);

  const list = Array.isArray(work) ? work : [];

  return (
    <section
      id="work"
      className="bg-[#FDF0F5] lg:px-[180px] overflow-hidden py-20"
    >
      <div className="text-center mb-20">
        <div className="inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
          Work Experience
        </div>

        <p className="text-pink-400 text-lg mb-4">
          What I Have Done So Far
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold text-[#6d4b59]">
          My Journey
        </h1>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full bg-pink-200 hidden lg:block z-0" />

        <div className="space-y-16 relative z-10">
          {list.map((group, groupIndex) =>
            group.work_experiences.map(
              (experience: any, index: number) => {
                const isLeft =
                  (groupIndex + index) % 2 === 0;

                const descList = (
                  experience.description ?? ""
                )
                  .split(".")
                  .map((s: string) => s.trim())
                  .filter(Boolean);

                const Card = (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isLeft ? -120 : 120,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/70 backdrop-blur-md border border-pink-100 p-7 rounded-[32px]"
                  >
                    <h2 className="text-2xl font-bold mb-2 text-[#6d4b59]">
                      {experience.title}
                    </h2>

                    <p className="text-pink-400 font-semibold mb-5">
                      {experience.company}
                    </p>

                    <ul className="space-y-3 text-[#7b5a68]">
                      {descList.map(
                        (item: string, i: number) => (
                          <li
                            key={`${experience.id}-${i}`}
                          >
                            • {item}
                          </li>
                        )
                      )}
                    </ul>
                  </motion.div>
                );

                return (
                  <div
                    key={experience.id}
                    className="grid grid-cols-1 lg:grid-cols-[1fr_120px_1fr] gap-8 items-center"
                  >
                    <div>
                      {isLeft ? Card : null}
                    </div>

                    <div className="relative flex flex-col items-center z-10">
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-200 flex items-center justify-center shadow-lg">
                        <img
                          src={
                            experience.logo ||
                            "/default-logo.png"
                          }
                          alt={`${experience.company} logo`}
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      <p className="mt-4 text-sm text-[#8b6b77] text-center">
                        {experience.date_range}
                      </p>

                      <p className="text-pink-400 font-semibold mt-2">
                        {group.year}
                      </p>
                    </div>

                    <div>
                      {!isLeft ? Card : null}
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </section>
  );
}