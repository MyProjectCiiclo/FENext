"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProfile } from "@/hooks";

const menuItems = [
  { name: "Home", href: "intro" },
  { name: "About", href: "about" },
  { name: "Education", href: "education" },
  { name: "Experience", href: "work" },
  { name: "Skills", href: "skills" },
  { name: "Contact", href: "contact" },
];

export default function Header() {
  const { profile, loading } = useProfile();

  const [openMenu, setOpenMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");


  useEffect(() => {
    const sections = menuItems.map((item) => item.href);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });


    return () => {
      observer.disconnect();
    };

  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f3d8e4] bg-[#FDF0F5]/90 backdrop-blur-xl">

      <div className="mx-auto flex items-center justify-between px-4 lg:px-[180px] py-2">


        <div className="flex items-center gap-4 cursor-pointer group">

          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">

            <Image
              src={profile?.avatar || "/assets/image-personal.png"}
              alt="Avatar"
              fill
              className="
              object-cover 
              border-2 
              border-pink-300 
              shadow-[0_0_20px_rgba(244,114,182,0.35)]
              group-hover:scale-105
              transition
              duration-300
              "
            />

            <div className="
              absolute 
              inset-0 
              rounded-full 
              border-2 
              border-pink-200 
              animate-ping 
              opacity-20
            "/>

          </div>


          <div>

            <h1 className="text-[#4b2e39] text-[18px] font-bold tracking-wide">

              {loading
                ? "Loading..."
                : profile?.full_name
              }

            </h1>


            <p className="text-[#9b7283] text-[16px]">

              {loading
                ? "Loading..."
                : profile?.title
              }

            </p>

          </div>

        </div>


        <nav className="hidden md:block">

          <ul className="
            flex 
            items-center 
            gap-10 
            text-[16px] 
            font-medium
          ">

            {menuItems.map((item) => (

              <li key={item.href}>

                <Link

                  href={`/#${item.href}`}

                  className={`
                    relative
                    transition
                    duration-300

                    ${activeSection === item.href
                      ? "text-pink-500 font-bold"
                      : "text-[#6d4b59] hover:text-pink-400"
                    }
                  `}

                >

                  {item.name}


                  {
                    activeSection === item.href && (

                      <span
                        className="
                        absolute
                        left-0
                        -bottom-2
                        w-full
                        h-[2px]
                        bg-pink-400
                        rounded-full
                        "
                      />

                    )
                  }


                </Link>

              </li>

            ))}


          </ul>

        </nav>



        <div className="hidden md:flex">

          <Link

            href="/#contact"

            className="
            px-5 
            py-2 
            rounded-full 
            bg-pink-400 
            text-white 
            font-semibold 
            hover:bg-pink-500
            hover:scale-105 
            transition 
            duration-300
            "

          >

            Hire Me

          </Link>

        </div>


        <button

          className="
          md:hidden 
          text-[#6d4b59] 
          text-3xl
          "

          onClick={() => setOpenMenu(!openMenu)}

        >

          ☰

        </button>


      </div>


      {
        openMenu && (

          <div className="
          absolute
          top-full
          left-0
          w-full
          bg-[#FDF0F5]
          border-t
          border-[#f3d8e4]
          shadow-lg
          md:hidden
          ">


            <ul className="
            flex
            flex-col
            text-[#6d4b59]
            font-medium
            ">


              {
                menuItems.map((item) => (

                  <li key={item.href}>


                    <Link

                      href={`/#${item.href}`}

                      onClick={() => setOpenMenu(false)}

                      className={`
                      block
                      px-6
                      py-4
                      hover:bg-pink-50

                      ${activeSection === item.href
                          ? "text-pink-500 font-bold"
                          : ""
                        }
                      `}

                    >

                      {item.name}

                    </Link>


                  </li>

                ))
              }


              <li className="px-6 py-4">

                <Link

                  href="/#contact"

                  onClick={() => setOpenMenu(false)}

                  className="
                  block
                  text-center
                  px-5
                  py-3
                  rounded-full
                  bg-pink-400
                  text-white
                  font-semibold
                  "

                >

                  Hire Me

                </Link>

              </li>


            </ul>


          </div>

        )
      }


    </header>
  );
}