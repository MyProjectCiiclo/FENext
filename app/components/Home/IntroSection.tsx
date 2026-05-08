import Link from "next/link";

export default function IntroSection() {
  return (
    <section
      id="home"
      className=" bg-[#FDF0F5] text-white px-6 lg:px-[180px] py-16"
    >
      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className=" inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            OPEN TO FRONTEND INTERN ROLES
          </div>

          <h1 className="text-[#6d4b59] text-4xl md:text-6xl font-bold leading-tight mb-6">
            Building modern
            <span className="text-pink-400">web applications</span>,
            <br />
            one feature at a time.
          </h1>

          <p className="text-[#6d4b59] mb-8 max-w-xl">
            {" "}
            Im <span className="font-semibold">Hồ Thị Kim Thanh</span> — a
            passionate Frontend Developer. I create responsive and user-friendly
            web applications using Vue.js, TailwindCSS, and modern web
            technologies.
          </p>

          <div className="flex gap-4">
            <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-medium transition">
              Get In Touch →
            </button>

            <button className="border border-[#6d4b59] hover:border-[#6d4b59] px-6 py-3 rounded-lg transition">
              <Link href="/#work" className="text-[#6d4b59] no-underline">
                View Experience →
              </Link>
            </button>
          </div>

          <div className="mt-12 space-y-3 text-sm tracking-widest">
            <div className="flex items-center gap-4 text-pink-400">
              <span className="w-6 h-[1px] bg-pink-400"></span>
              <span>ABOUT</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <span className="w-6 h-[1px] bg-gray-600"></span>
              <span>PROJECTS</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <span className="w-6 h-[1px] bg-gray-600"></span>
              <span>CONTACT</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center relative">
            <div className="absolute w-[500px] h-[500px] bg-pink-200/40 blur-3xl rounded-full"></div>

            <div className="relative w-[420px] h-[420px] rounded-full border-[18px] border-pink-300 overflow-hidden shadow-2xl z-10">
              <img
                src="/assets/image-personal.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-10 right-0 translate-x-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-3 z-20">
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm">
                📄
              </div>
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-bold text-gray-800">1128+</p>
              </div>
            </div>

            <div className="absolute bottom-10 left-0 -translate-x-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-3 z-20">
              <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm">
                🐞
              </div>
              <div>
                <p className="text-sm text-gray-500">Defects found</p>
                <p className="font-bold text-gray-800">145+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
