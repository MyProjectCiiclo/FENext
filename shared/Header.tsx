import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f3d8e4] bg-[#FDF0F5]/90 backdrop-blur-xl">
      <div className=" mx-auto flex items-center justify-between px-4 lg:px-[180px] py-2">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative">
            <img
              src="/assets/image-personal.png"
              alt="Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover border-2 border-pink-300 shadow-[0_0_20px_rgba(244,114,182,0.35)] group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 rounded-full border-2 border-pink-200 animate-ping opacity-20"></div>
          </div>

          <div>
            <h1 className="text-[#4b2e39] text-[18px] font-bold tracking-wide">
              Kim Thanh
            </h1>

            <p className="text-[#9b7283] text-[16px]">Software Engineer</p>
          </div>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-10 text-[16px] font-medium text-[#6d4b59]">
            <li>
              <Link
                href="/#intro"
                className="relative hover:text-pink-500 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="relative hover:text-pink-500 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/#skills"
                className="relative hover:text-pink-500 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Skills
              </Link>
            </li>

            <li>
              <Link
                href="/#contact"
                className="relative hover:text-pink-500 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 rounded-full bg-pink-400 text-white font-semibold hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(244,114,182,0.35)]">
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-[#6d4b59] text-2xl">☰</button>
      </div>
    </header>
  );
}
