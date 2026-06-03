"use client";

import { useSkill } from "@/hooks/useSkill";

export default function Skill() {
  const { skills } = useSkill();

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <section
      id="skills"
      className="bg-[#FDF0F5] py-10 overflow-hidden px-6 lg:px-[180px]"
    >
      <div className="relative w-fit mx-auto mb-[70px]">
        <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold">
          Skills
          <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
          <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-[scrollLeft_12s_linear_infinite] gap-[50px]">
          {[...safeSkills, ...safeSkills].map((skill, index) => (
            <div
              key={`${skill.id ?? skill.name}-${index}`}
              className="w-[200px] h-[180px] bg-white rounded-[12px] flex flex-col justify-center items-center shrink-0"
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="w-[50px] h-[50px] object-contain mb-4"
              />

              <h3 className="text-black text-[16px] font-medium">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
