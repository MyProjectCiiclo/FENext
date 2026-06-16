"use client";

import { Mail, Phone, MapPin, Eye } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useContact } from "@/hooks/useContact";
import { useState } from "react";
import { useProfile, useCv } from "@/hooks";
import type { Contact } from "@/types";
import LoadingSpinner from "@/shared/Loading";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function Contact() {
  const { sendContact, isSending } = useContact();
  const { profile } = useProfile();
  const { cv } = useCv();

  const latestCv = cv?.[0];

  const [viewUrl, setViewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<Contact>({
    id: 0,
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendContact(formData);

    setFormData({
      id: 0,
      name: "",
      email: "",
      message: "",
    });
  };

  const getCvUrl = (path?: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/${path}`;
  };

  const handleView = (url?: string) => {
    if (!url) return;
    setViewUrl(getCvUrl(url));
  };

  const handleDownload = (url?: string) => {
    if (!url) return;

    const fileUrl = getCvUrl(url);
    const downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="bg-[#FDF0F5] px-6 py-10 lg:px-[180px]">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#f8d9e5] text-pink-400 px-8 py-3 rounded-xl text-lg font-semibold mb-6">
            Contact Me
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-pink-400 mb-5">
            Let’s Work Together
          </h2>

          <p className="text-[#6d4b59] max-w-2xl mx-auto leading-8">
            Feel free to reach out. I’m always open to discussing new projects,
            ideas, or opportunities.
          </p>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="bg-white/70 backdrop-blur-md border border-pink-100 p-8 rounded-[32px]">
            <h2 className="text-2xl font-bold mb-8 text-[#6d4b59]">
              Get in Touch
            </h2>

            {/* 🔥 SENDING BANNER */}
            {isSending && (
              <div className="mb-4 bg-pink-400 text-white px-4 py-2 rounded-xl text-center animate-pulse">
                📤 Sending your message...
              </div>
            )}

            {!isSending && (
              <div className="space-y-5 text-[#7b5a68]">
                <a href={`tel:${profile?.phone}`} className="flex gap-2 items-center">
                  <Phone size={18} />
                  {profile?.phone}
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    profile?.location || "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <MapPin size={18} />
                  {profile?.location}
                </a>

                <a href={`mailto:${profile?.email}`} className="flex gap-2 items-center">
                  <Mail size={18} />
                  {profile?.email}
                </a>

                <a href={profile?.linkedin} target="_blank" className="flex gap-2 items-center">
                  <FaLinkedin />
                  LinkedIn
                </a>

                <a href={profile?.github} target="_blank" className="flex gap-2 items-center">
                  <FaGithub />
                  GitHub
                </a>
              </div>
            )}

            {/* CV */}
            <div className="mt-10 border-t pt-6 space-y-4 text-[#6d4b59]">
              <h3 className="text-lg font-semibold">CV</h3>

              <p>{profile?.full_name}</p>

              <div className="flex gap-4">
                <button
                  disabled={!latestCv?.cv || isSending}
                  onClick={() => handleView(latestCv?.cv)}
                  className="px-5 py-2 bg-pink-400 text-white rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2"
                >
                  <Eye size={14} />
                  View CV
                </button>

                <button
                  disabled={!latestCv?.cv || isSending}
                  onClick={() => handleDownload(latestCv?.cv)}
                  className="px-5 py-2 border border-pink-400 text-pink-400 rounded-xl font-semibold disabled:opacity-50"
                >
                  Download CV
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/70 backdrop-blur-md border border-pink-100 p-8 rounded-[32px]">
            <h2 className="text-2xl font-bold mb-8 text-[#6d4b59]">
              Send Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSending}
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl bg-[#fde7ef]"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSending}
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl bg-[#fde7ef]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSending}
                placeholder="Your Message"
                className="w-full p-4 rounded-2xl bg-[#fde7ef]"
              />

              <button
                disabled={isSending}
                className="w-full bg-pink-400 text-white py-4 rounded-2xl font-semibold disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CV MODAL */}
      {viewUrl && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[85%] h-[90%] rounded-xl relative">
            <button
              onClick={() => setViewUrl(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <iframe src={viewUrl} className="w-full h-full" />
          </div>
        </div>
      )}
    </section>
  );
}