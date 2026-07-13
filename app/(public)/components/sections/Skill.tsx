"use client";

import { useSkill } from "@/hooks/useSkill";
import LoadingSpinner from "@/shared/Loading";
export default function Skill() {
  const { skills } = useSkill();

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <section
      id="skills"
      className="bg-[#FDF0F5] py-10 overflow-hidden px-6 lg:px-[180px]"
    >
      <div className="relative w-fit mx-auto mb-[70px]">
        <div className="flex items-center justify-center gap-5 mb-6">
          <span className="h-px w-16 bg-pink-300"></span>

          <span className="uppercase tracking-[0.3em] text-[24px] text-base font-semibold text-pink-500">
            Skills
          </span>

          <span className="h-px w-16 bg-pink-300"></span>
        </div>
      </div>

      {safeSkills.length > 0 ? (
        <div className="overflow-hidden">
          <div className="flex w-max animate-[scrollLeft_30s_linear_infinite] gap-[50px]">
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
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
}