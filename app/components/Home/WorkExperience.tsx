"use client";

import { motion } from "framer-motion";

export default function WorkExperience() {
  const workExperience = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "PNV",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      date_range: "2025 - Present",
      description:
        "Build responsive UI with React. Work with REST API. Collaborate with team members.",
    },

    {
      id: 2,
      title: "Backend Developer",
      company: "Company XYZ",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      date_range: "2024 - 2025",
      description:
        "Develop APIs using NestJS. Manage database systems. Optimize backend performance.",
    },
  ];

  return (
    <section
    id="work"
     className="bg-[#FDF0F5] lg:px-[180px] overflow-hidden">
      <div className="text-center mb-20">
        <div className="relative inline-block bg-[#f8d9e5] text-pink-400  px-8 py-3 rounded-xl text-lg font-semibold mb-6">
          Work Experience
          <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
          <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
        </div>

        <p className="text-pink-400 text-lg mb-4">What I Have Done So Far</p>

        <h1 className="text-4xl lg:text-5xl font-bold text-[#6d4b59]">
          My Journey
        </h1>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full bg-pink-200 hidden lg:block"></div>

        <div className="space-y-16">
          {workExperience.map((experience, index) => (
            <div
              key={experience.id}
              className="grid grid-cols-1 lg:grid-cols-[1fr_120px_1fr] gap-8 items-center"
            >
              {index % 2 === 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: -120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-md border border-pink-100 p-7 rounded-[32px] shadow-[0_10px_40px_rgba(244,114,182,0.12)]"
                >
                  <h2 className="text-2xl font-bold mb-2 text-[#6d4b59]">
                    {experience.title}
                  </h2>

                  <p className="text-pink-400 font-semibold mb-5">
                    {experience.company}
                  </p>

                  <ul className="space-y-3 text-[15px] text-[#7b5a68] leading-7">
                    {experience.description
                      .split(".")
                      .filter((item) => item.trim() !== "")
                      .map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                  </ul>
                </motion.div>
              ) : (
                <div></div>
              )}

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center relative"
              >
                <div className="w-20 h-20 rounded-full bg-white border-4 border-pink-200 flex items-center justify-center shadow-[0_10px_30px_rgba(244,114,182,0.2)] z-10">
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <p className="mt-4 text-sm text-[#8b6b77] text-center font-medium">
                  {experience.date_range}
                </p>
              </motion.div>

              {index % 2 !== 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-md border border-pink-100 p-7 rounded-[32px] shadow-[0_10px_40px_rgba(244,114,182,0.12)]"
                >
                  <h2 className="text-2xl font-bold mb-2 text-[#6d4b59]">
                    {experience.title}
                  </h2>

                  <p className="text-pink-400 font-semibold mb-5">
                    {experience.company}
                  </p>

                  <ul className="space-y-3 text-[15px] text-[#7b5a68] leading-7">
                    {experience.description
                      .split(".")
                      .filter((item) => item.trim() !== "")
                      .map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                  </ul>
                </motion.div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
