"use client";

import { useState } from "react";

import {
  GraduationCap,
  CalendarDays,
  BookOpen,
  Pencil,
  Plus,
  X,
} from "lucide-react";

import type React from "react";

type CourseType = {
  id: number;
  name: string;
};

export default function AdminEducation() {
  const [edit, setEdit] = useState(false);

  const [newCourse, setNewCourse] = useState("");

  const [education, setEducation] = useState({
    school: "PNV College",

    major: "Software Engineering",

    duration: "2023 - Present",

    description:
      "Focused on Frontend Development, Full Stack Web Applications, and UI/UX Design.",
  });

  const [courses, setCourses] = useState<CourseType[]>([
    {
      id: 1,
      name: "Web Development",
    },

    {
      id: 2,
      name: "UI/UX Design",
    },

    {
      id: 3,
      name: "Database Management",
    },

    {
      id: 4,
      name: "Agile Scrum",
    },
  ]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddCourse() {
    if (!newCourse.trim()) return;

    setCourses([
      ...courses,

      {
        id: Date.now(),
        name: newCourse,
      },
    ]);

    setNewCourse("");
  }

  function handleDeleteCourse(id: number) {
    setCourses(courses.filter((course) => course.id !== id));
  }

  return (
    <section
      className="
        bg-white
        rounded-[32px]
        overflow-hidden
        border border-pink-100
        shadow-[0_10px_40px_rgba(255,105,180,0.08)]
        relative
      "
    >
      <div className="relative h-20 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300">
        <button
          onClick={() => setEdit(!edit)}
          className="
            absolute top-5 right-5
            px-5 py-2
            rounded-2xl
            bg-white/20
            backdrop-blur-md
            border border-white/30
            flex items-center gap-2
            text-white
            hover:scale-105
            transition
          "
        >
          <Pencil size={18} />

          {edit ? "Close Edit" : "Edit Education"}
        </button>
      </div>

      <div className="px-8 pb-8 relative">
        <div className="-mt-10 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
          <GraduationCap className="text-pink-500" size={36} />
        </div>

        <div
          className={`
            mt-6
            transition-all
            duration-300
            ${edit ? "ring-4 ring-pink-100 rounded-3xl p-4 bg-pink-50/30" : ""}
          `}
        >
          <div>
            {edit ? (
              <input
                type="text"
                name="school"
                value={education.school}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border-2 border-pink-300
                  bg-white
                  px-4 py-3
                  text-3xl
                  font-bold
                  outline-none
                  focus:border-pink-500
                "
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-800">
                {education.school}
              </h2>
            )}
          </div>

          <div className="mt-3">
            {edit ? (
              <input
                type="text"
                name="major"
                value={education.major}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border-2 border-pink-300
                  bg-white
                  px-4 py-3
                  text-pink-500
                  font-semibold
                  outline-none
                  focus:border-pink-500
                "
              />
            ) : (
              <p className="text-pink-500 font-semibold text-lg">
                {education.major}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 bg-[#fff7fb] border border-pink-100 rounded-2xl p-4">
            <CalendarDays className="text-pink-500" size={22} />

            {edit ? (
              <input
                type="text"
                name="duration"
                value={education.duration}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border-2 border-pink-300
                  bg-white
                  px-4 py-2
                  outline-none
                  focus:border-pink-500
                "
              />
            ) : (
              <p className="font-medium text-gray-700">{education.duration}</p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={20} className="text-pink-500" />

              <h3 className="font-semibold text-[#6d4b59]">Description</h3>
            </div>

            {edit ? (
              <textarea
                name="description"
                rows={4}
                value={education.description}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border-2 border-pink-300
                  bg-white
                  px-4 py-4
                  outline-none
                  resize-none
                  focus:border-pink-500
                "
              />
            ) : (
              <p className="text-[#6d4b59] leading-8">
                {education.description}
              </p>
            )}
          </div>

          {/* COURSES */}
          <div className="mt-8">
            <h3 className="font-semibold text-[#6d4b59] mb-4">
              Relevant Coursework
            </h3>

            <div className="flex flex-wrap gap-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-pink-50
                    border border-pink-100
                  "
                >
                  <span className="text-sm text-pink-500 font-medium">
                    {course.name}
                  </span>

                  {edit && (
                    <button onClick={() => handleDeleteCourse(course.id)}>
                      <X size={14} className="text-pink-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ADD COURSE */}
            {edit && (
              <div className="flex gap-3 mt-5">
                <input
                  type="text"
                  placeholder="Add new course..."
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="
                    flex-1
                    rounded-2xl
                    border-2 border-pink-300
                    bg-white
                    px-4 py-3
                    outline-none
                    focus:border-pink-500
                  "
                />

                <button
                  onClick={handleAddCourse}
                  className="
                    px-5
                    rounded-2xl
                    bg-pink-500
                    text-white
                    flex items-center gap-2
                    hover:scale-105
                    transition
                  "
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SAVE */}
        {edit && (
          <button
            className="
              mt-8
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-pink-500
              to-rose-400
              py-4
              text-white
              font-semibold
              hover:scale-[1.01]
              transition
            "
          >
            Save Changes
          </button>
        )}
      </div>
    </section>
  );
}
