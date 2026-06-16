import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#FDF0F5] border-t border-pink-100 py-[60px] pb-[25px]">
      <div className="mx-auto px-5 sm:px-8 lg:px-[180px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-[40px] pb-[35px] border-b border-pink-100">
          <div>
            <h3 className="text-[#6d4b59] text-[20px] mb-[18px] font-bold">
              Portfolio
            </h3>

            <p className="text-[15px] leading-7 text-[#7b5a68]">
              Creating high-quality products and solving problems through
              technology.
            </p>
          </div>

          <div>
            <h3 className="text-[#6d4b59] text-[20px] mb-[18px] font-bold">
              Navigation
            </h3>

            <ul className="space-y-[12px]">
              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  About Me
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#6d4b59] text-[20px] mb-[18px] font-bold">
              Resources
            </h3>

            <ul className="space-y-[12px]">
              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Tutorials
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7b5a68] hover:text-pink-400 duration-300"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#6d4b59] text-[20px] mb-[18px] font-bold">
              Connect
            </h3>

            <div className="flex flex-wrap gap-[12px]">
              <a
                href="https://github.com/KimThanh1801"
                className="bg-[#fde7ef] text-[#6d4b59] p-[12px] rounded-[12px] hover:bg-pink-400 hover:text-white duration-300 shadow-sm"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com/in/ho-thi-kim-thanh/"
                className="bg-[#fde7ef] text-[#6d4b59] p-[12px] rounded-[12px] hover:bg-pink-400 hover:text-white duration-300 shadow-sm"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hokimthanh1234@gmail.com"
                className="bg-[#fde7ef] text-[#6d4b59] p-[12px] rounded-[12px] hover:bg-pink-400 hover:text-white duration-300 shadow-sm"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-[24px] text-[14px] text-center md:text-left">
          <p className="text-[#9a7b87]">
            © 2026 Portfolio. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-[20px]">
            <a
              href="#"
              className="text-[#9a7b87] hover:text-pink-400 duration-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[#9a7b87] hover:text-pink-400 duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}