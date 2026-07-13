"use client";

import { Calendar, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useEducation } from "@/hooks/useEducation";
import LoadingSpinner from "@/shared/Loading";

export default function EducationSection() {
    const { edu: educations, loading } = useEducation();

    return (
        <section
            id="education"
            className="bg-[#FDF0F5]/90 px-6 py-16 lg:px-[180px]"
        >
            <div className="max-w-7xl mx-auto">

                {/* Title Animation */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="flex items-center justify-center gap-5 mb-16"
                >
                    <span className="h-px w-16 bg-pink-300"></span>

                    <span className="uppercase tracking-[0.3em] text-[24px] font-semibold text-pink-500">
                        Education
                    </span>

                    <span className="h-px w-16 bg-pink-300"></span>

                </motion.div>


                {loading ? (

                    <div className="flex justify-center py-10">
                        <LoadingSpinner />
                    </div>

                ) : educations.length > 0 ? (

                    <div className="space-y-8">

                        {educations.map((edu, index) => (

                            <motion.div
                                key={edu.id}

                                initial={{
                                    opacity: 0,
                                    y: 60,
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}

                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: "easeOut",
                                }}

                                className="
                                    rounded-3xl 
                                    bg-white 
                                    p-8 
                                    shadow-xl 
                                    transition 
                                    hover:shadow-2xl
                                    hover:-translate-y-1
                                "
                            >


                                <div className="flex items-start gap-5">


                                    <div
                                        className="
                                        flex 
                                        items-center 
                                        justify-center 
                                        rounded-2xl 
                                        bg-pink-100 
                                        p-3
                                        "
                                    >

                                        <GraduationCap
                                            size={32}
                                            className="text-pink-500"
                                        />

                                    </div>



                                    <div>

                                        <h3 className="
                                            text-2xl 
                                            font-bold 
                                            text-[#6d4b59]
                                        ">
                                            {edu.school}
                                        </h3>


                                        <p className="
                                            mt-2 
                                            font-semibold 
                                            text-pink-500
                                        ">
                                            {edu.degree}
                                        </p>


                                        <p className="text-[#6d4b59]">
                                            {edu.major}
                                        </p>


                                    </div>


                                </div>




                                <div className="
                                    mt-6 
                                    flex 
                                    items-center 
                                    gap-2 
                                    text-[#6d4b59]
                                ">

                                    <Calendar
                                        size={18}
                                        className="text-pink-400"
                                    />


                                    <span>
                                        {new Date(edu.start_date).getFullYear()}
                                        {" - "}
                                        {new Date(edu.end_date).getFullYear()}
                                    </span>


                                </div>





                                {edu.description && (

                                    <p className="
                                        mt-5 
                                        text-[#6d4b59] 
                                        leading-8
                                    ">
                                        {edu.description}
                                    </p>

                                )}






                                {edu.courses?.length > 0 && (

                                    <div className="
                                        mt-6 
                                        flex 
                                        flex-wrap 
                                        gap-3
                                    ">

                                        {edu.courses.map((course) => (

                                            <motion.span

                                                key={course.id}

                                                whileHover={{
                                                    scale: 1.05,
                                                }}

                                                className="
                                                    rounded-full 
                                                    bg-pink-100 
                                                    px-4 
                                                    py-2 
                                                    text-sm 
                                                    font-medium 
                                                    text-pink-600
                                                "
                                            >

                                                {course.name}

                                            </motion.span>

                                        ))}


                                    </div>

                                )}


                            </motion.div>

                        ))}


                    </div>


                ) : (


                    <p className="
                        text-center 
                        text-[#6d4b59]
                    ">
                        No education information available.
                    </p>


                )}


            </div>
        </section>
    );
}