"use client";

import useProject from "@/hooks/useProject";
import Image from "next/image";

export default function ProjectList() {
  const { projects, loading } = useProject();

  return (
    <section className="bg-[#FDF0F5]/90 px-6 lg:px-[180px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            My Projects
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            Featured Work
          </h2>

          <p className="text-[#6d4b59] max-w-3xl mx-auto leading-8">
            A selection of projects I’ve built, showcasing my skills in
            frontend, backend, and full-stack development.
          </p>
        </div>
        {loading ? (
          <p className="text-center text-[#6d4b59]">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.slice(0, 6).map((project) => (
              <div
                key={project.id}
                className="bg-white/70 backdrop-blur-md border border-pink-100 rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.image_url || "/default.png"}
                    alt={project.project_name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[#6d4b59] mb-2">
                    {project.project_name}
                  </h3>

                  <p className="text-sm text-[#7b5a68] leading-6">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
