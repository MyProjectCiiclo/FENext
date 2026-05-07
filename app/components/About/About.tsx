export default function About() {
  const skills = [
    { name: "React", percent: "80%" },
    { name: "TypeScript", percent: "75%" },
    { name: "NestJS", percent: "70%" },
    { name: "PHP", percent: "85%" },
  ];

  return (
    <section 
    id="about"
    className=" bg-[#FDF0F5]/90 text-white px-6 py-16 lg:px-[180px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            About Me
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
          </div>

          <h2 className="text-2xl font-bold text-pink-400 mb-5">
            Full-stack Developer Intern
          </h2>

          <p className="  text-[#6d4b59] max-w-3xl mx-auto leading-8">
            Final-year IT student at Passerelles Numériques Vietnam with a
            strong foundation in Full-stack Web Development. I build scalable
            and modern applications using React, TypeScript, NestJS, and PHP.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-14">
          <div className="w-full lg:w-[420px]">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[520px]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4WvcBgNowPZ-sf_55lybGEFNZVZfssfMFKyzc86L6MxgEK1yDagA0UC_RxBA3_QDJAfbJdfCGY6_NM-4dIH_SuVFQNa5Y4D92QP-FQ&s"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-[#6d4b59] text-3xl lg:text-4xl font-bold leading-snug">
                Transforming Ideas into Digital Reality
              </h2>

              <p className="text-[#6d4b59] mt-6  text-sm lg:text-base leading-8">
                Final-year IT student focused on Full-stack Development. I use{" "}
                <span className="text-[#6d4b59] font-semibold">React</span>,{" "}
                <span className="text-[#6d4b59] font-semibold">TypeScript</span>
                , <span className="text-[#6d4b59] font-semibold">NestJS</span>,{" "}
                <span className="text-[#6d4b59] font-semibold">PHP</span> to
                build modern web applications.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-[#6d4b59] text-xl font-bold mb-7">
                Technical Proficiency
              </h3>

              {skills.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between text-sm mb-2 text-[#6d4b59] font-medium">
                    <span>{skill.name}</span>
                    <span>{skill.percent}</span>
                  </div>

                  <div className="w-full h-3 bg-[#29496b] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: skill.percent }}
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
                I develop modern frontend interfaces with Vue and React, build
                backend systems with Node.js and Laravel, and design scalable
                database systems for real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
