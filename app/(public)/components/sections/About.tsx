"use client";

import { useProfile, useSkill } from "@/hooks";
import LoadingSpinner from "@/shared/Loading";
import { Skill } from "@/types";
export default function About() {
  const { profile } = useProfile();
  const { skills } = useSkill();

  return (
    <section
      id="about"
      className="bg-[#FDF0F5]/90 text-white px-6 py-16 lg:px-[180px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            About Me
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            {profile?.title}
          </h2>

          <p className="text-[#6d4b59] max-w-3xl mx-auto leading-8">
            {profile?.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-14">
          <div className="w-full lg:w-[420px]">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[520px]">
              <img
                src={profile?.avatar || "/assets/image-personal.png"}
                alt={profile?.full_name || "profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-[#6d4b59] text-3xl lg:text-4xl font-bold leading-snug">
                {profile?.full_name}
              </h2>

              <p className="text-[#6d4b59] mt-6 text-sm lg:text-base leading-8">
                {profile?.title} with {profile?.experience_years} years and{" "}
                {profile?.degree}.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-xl font-bold mb-7">
                Technical Proficiency
              </h3>

              {skills?.length ? (
                skills.map((skill: Skill) => {
                  const percentage = Math.min(
                    Math.max(Number(skill.weight) || 0, 0),
                    100
                  );

                  return (
                    <div key={skill.id} className="mb-6">
                      <div className="flex justify-between text-sm mb-2 text-[#6d4b59] font-medium">
                        <span>{skill.name}</span>
                        <span>{percentage}%</span>
                      </div>

                      <div className="w-full h-3 bg-[#6d4b59] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pink-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                 <div>
                  <LoadingSpinner/>
                  </div>
              )}
            </div>

            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-xl font-bold mb-5">
                What I Do
              </h3>

              <p className="text-[#6d4b59] text-sm lg:text-base leading-8">
                {profile?.title} with {profile?.experience_years} years of
                experience building scalable web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}