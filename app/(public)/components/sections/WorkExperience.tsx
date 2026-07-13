"use client";

import { motion } from "framer-motion";
import { useWork } from "@/hooks/useWork";
import LoadingSpinner from "@/shared/Loading";
import { WorkExperiences } from "@/types";

export default function WorkExperience() {
  const { work, loading } = useWork();

  const timeline = (Array.isArray(work) ? work : []).flatMap((group) =>
    (group.work_experiences ?? []).map((experience) => ({
      ...experience,
      year: group.year,
    }))
  );

  return (
    <section
      id="work"
      className="bg-[#FDF0F5] py-20 lg:px-[180px] overflow-hidden"
    >
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-5 mb-6">
          <span className="h-px w-16 bg-pink-300"></span>

          <span className="uppercase tracking-[0.3em] text-2xl font-semibold text-pink-500">
            Work Experience
          </span>

          <span className="h-px w-16 bg-pink-300"></span>
        </div>

        <p className="text-pink-400 text-lg mb-3">
          What I Have Done So Far
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold text-[#6d4b59]">
          My Journey
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full bg-pink-200" />

          <div className="space-y-20">
            {timeline.map(
              (
                experience: WorkExperiences & { year: number },
                index
              ) => {
                const isLeft = index % 2 === 0;

                const descList = (experience.description ?? "")
                  .split(".")
                  .map((item) => item.trim())
                  .filter(Boolean);

                return (
                  <div
                    key={experience.id}
                    className="grid lg:grid-cols-[1fr_120px_1fr] gap-10 items-center"
                  >
                    <div className="hidden lg:block">
                      {isLeft && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: -120,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: false,
                            amount: 0.3,
                          }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg"
                        >
                          <h2 className="text-2xl font-bold text-[#6d4b59]">
                            {experience.title}
                          </h2>

                          <p className="mt-2 font-semibold text-pink-500">
                            {experience.company}
                          </p>

                          <ul className="mt-5 space-y-2 text-[#6d4b59] text-sm leading-7">
                            {descList.map((item, i) => (
                              <li key={i}>
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: false,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="relative flex flex-col items-center z-10"
                    >
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-200 shadow-lg flex items-center justify-center">
                        <img
                          src={
                            experience.logo || "/default-logo.png"
                          }
                          alt={experience.company}
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      <p className="mt-4 text-sm text-gray-500 text-center">
                        {experience.date_range}
                      </p>

                      <p className="text-pink-500 font-semibold">
                        {experience.year}
                      </p>
                    </motion.div>

                    <div className="hidden lg:block">
                      {!isLeft && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: 120,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: false,
                            amount: 0.3,
                          }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg"
                        >
                          <h2 className="text-2xl font-bold text-[#6d4b59]">
                            {experience.title}
                          </h2>

                          <p className="mt-2 font-semibold text-pink-500">
                            {experience.company}
                          </p>

                          <ul className="mt-5 space-y-2 text-[#6d4b59] text-sm leading-7">
                            {descList.map((item, i) => (
                              <li key={i}>
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>

                    <div className="lg:hidden col-span-full">
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 80,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: false,
                          amount: 0.3,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg"
                      >
                        <h2 className="text-2xl font-bold text-[#6d4b59]">
                          {experience.title}
                        </h2>

                        <p className="mt-2 font-semibold text-pink-500">
                          {experience.company}
                        </p>

                        <ul className="mt-5 space-y-2 text-[#6d4b59] text-sm leading-7">
                          {descList.map((item, i) => (
                            <li key={i}>
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </section>
  );
}