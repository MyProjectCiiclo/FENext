"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useContact } from "@/hooks/useContact";
import { useState } from "react";
import { ContactForm } from "@/types/contact";
export default function Contact() {
  const { sendContact, loading } = useContact();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("SUBMIT OK");
    await sendContact(formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <section id="contact" className=" bg-[#FDF0F5] px-6 py-20 lg:px-[180px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block bg-[#f8d9e5] text-[#6d4b59] px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            Contact Me
            <span className="hidden md:block absolute top-1/2 right-full w-28 h-[1px] bg-pink-200 mr-4"></span>
            <span className="hidden md:block absolute top-1/2 left-full w-28 h-[1px] bg-pink-200 ml-4"></span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-pink-400 mb-5">
            Let’s Work Together
          </h2>

          <p className="text-[#6d4b59] max-w-2xl mx-auto leading-8">
            Feel free to reach out. I’m always open to discussing new projects,
            ideas, or opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white/70 backdrop-blur-md border border-pink-100 p-8 rounded-[32px] shadow-[0_10px_40px_rgba(244,114,182,0.12)]">
            <h2 className="text-2xl font-bold mb-8 text-[#6d4b59]">
              Get in Touch
            </h2>

            <div className="space-y-5 text-[#7b5a68]">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hokimthanh1234@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 items-center block hover:text-pink-400 duration-300"
              >
                <Mail size={18} />
                hokimthanh1234@gmail.com
              </a>

              <a
                href="tel:0335044593"
                className="flex gap-2 items-center block hover:text-pink-400 duration-300"
              >
                <Phone />
                0335044593
              </a>

              <a
                href="https://www.google.com/maps?q=Da+Nang+Vietnam"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 items-center block hover:text-pink-400 duration-300"
              >
                <MapPin />
                Da Nang, Vietnam
              </a>

              <a
                href="https://github.com/KimThanh1801"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 items-center block hover:text-pink-400 duration-300"
              >
                <FaGithub />
                github.com/KimThanh1801
              </a>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-pink-100 p-8 rounded-[32px] shadow-[0_10px_40px_rgba(244,114,182,0.12)]">
            <h2 className="text-2xl font-bold mb-8 text-[#6d4b59]">
              Send Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl bg-[#fde7ef] border border-pink-100 text-[#6d4b59] placeholder-[#b88999] outline-none focus:ring-4 focus:ring-pink-200"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl bg-[#fde7ef] border border-pink-100 text-[#6d4b59] placeholder-[#b88999] outline-none focus:ring-4 focus:ring-pink-200"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-4 rounded-2xl bg-[#fde7ef] border border-pink-100 text-[#6d4b59] placeholder-[#b88999] outline-none resize-none focus:ring-4 focus:ring-pink-200"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-pink-400 text-white py-4 rounded-2xl font-semibold hover:bg-pink-500 hover:scale-[1.01] duration-300 shadow-[0_10px_25px_rgba(244,114,182,0.25)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
