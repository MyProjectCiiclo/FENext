"use client";

import { useProfile, useSkill } from "@/hooks";
import LoadingSpinner from "@/shared/Loading";
import { Skill } from "@/types";

export default function About() {
  const { profile } = useProfile();
  const { skills } = useSkill();

  const topSkills = [...(skills ?? [])]
    .sort((a, b) => Number(b.weight) - Number(a.weight))
    .slice(0, 5);

  return (
    <section
      id="about"
      className="bg-[#FDF0F5]/90 text-white px-6 py-16 lg:px-[180px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-5 mb-6">
            <span className="h-px w-16 bg-pink-300"></span>

            <span className="uppercase tracking-[0.3em] text-[24px] font-semibold text-pink-500">
              About Me
            </span>

            <span className="h-px w-16 bg-pink-300"></span>
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            {profile?.title}
          </h2>

          <p className="text-[#6d4b59] max-w-3xl mx-auto leading-8">
            {profile?.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-14 items-stretch">
          {/* Avatar */}
          <div className="w-full lg:w-[420px] flex">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-full min-h-[650px]">
              <img
                src={profile?.avatar || "/assets/image-personal.png"}
                alt={profile?.full_name || "profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div>
              <h2 className="text-[#6d4b59] text-3xl lg:text-4xl font-bold leading-snug">
                {profile?.full_name}
              </h2>

              <p className="text-[#6d4b59] mt-6 text-sm lg:text-base leading-8">
                I am a {profile?.title} with{" "}
                {profile?.experience_years} years of experience and a{" "}
                {profile?.degree} in Information Technology. I specialize in
                building modern web applications, integrating APIs, and
                creating scalable software solutions with clean and
                maintainable code.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-2xl font-bold mb-7">
                Top Skills
              </h3>

              {topSkills.length ? (
                topSkills.map((skill: Skill) => {
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
                          className="h-full bg-pink-400 rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <LoadingSpinner />
              )}
            </div>

            {/* What I Do */}
            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-2xl font-bold mb-5">
                What I Do
              </h3>

              <p className="text-[#6d4b59] text-sm lg:text-base leading-8">
                {profile?.title} with {profile?.experience_years} years of
                experience building scalable web applications. Experienced in
                developing frontend interfaces, integrating APIs, and working
                with modern technologies to deliver reliable and user-friendly
                software solutions. Passionate about learning,
                problem-solving, and contributing to high-quality products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}