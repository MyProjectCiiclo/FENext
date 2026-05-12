"use client";
import { useAbout } from "@/hooks/useAbout";
import { useEffect } from "react";

export default function About() {
  const { loading, about, getAbout } = useAbout();
  useEffect(() => {
    getAbout();
  }, []);
  return (
    <section
      id="about"
      className=" bg-[#FDF0F5]/90 text-white px-6 py-16 lg:px-[180px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            About Me
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            {about?.title}
          </h2>

          <p className="  text-[#6d4b59] max-w-3xl mx-auto leading-8">
            {about?.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-14">
          <div className="w-full lg:w-[420px]">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[520px]">
              <img
                src={
                  about
                    ? `/assets/${about.avatar}`
                    : "/assets/image-personal.png"
                }
                alt={about?.full_name || "profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-[#6d4b59] text-3xl lg:text-4xl font-bold leading-snug">
                {about?.full_name}
              </h2>

              <p className="text-[#6d4b59] mt-6  text-sm lg:text-base leading-8">
                {about?.title} with {about?.experience_years} of experience and
                a {about?.degree} background.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-xl font-bold mb-7">
                Technical Proficiency
              </h3>

              {about?.skills?.map((skill) => (
                <div key={skill.id} className="mb-6">
                  <div className="flex justify-between text-sm mb-2 text-[#6d4b59] font-medium">
                    <span>{skill.name}</span>
                    <span>{skill.percent}%</span>
                  </div>

                  <div className="w-full h-3 bg-[#6d4b59] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: `${skill.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-xl font-bold mb-5">
                What I Do
              </h3>

              <p className="text-[#6d4b59] text-sm lg:text-base leading-8">
                {about?.title} with {about?.experience_years} of experience
                building scalable web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}