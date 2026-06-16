"use client";

import { useState } from "react";
import { useRating } from "@/hooks";
import LoadingSpinner from "@/shared/Loading";

export default function RatingSection() {
  const { ratings, loading, createRating } = useRating();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const handleSubmit = async () => {
    if (!form.name || !form.message) return;

    await createRating(form);

    setForm({ name: "", message: "", rating: 5 });
    setOpen(false);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setForm({ ...form, rating: star })}
        className={`cursor-pointer text-2xl ${
          star <= form.rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="bg-[#FDF0F5]/90 px-6 py-16 lg:px-[180px]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-pink-400 mb-3">
            Testimonials
          </h2>

          <p className="text-[#6d4b59]">
            People sharing feedback about me
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 bg-pink-400 text-white px-5 py-2 rounded-full hover:bg-pink-500 transition"
          >
            ✍️ Leave a testimonial
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl">

              <h3 className="text-lg font-semibold mb-4 text-pink-400">
                Write your feedback
              </h3>

              <input
                className="w-full border p-3 rounded-lg mb-3"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <textarea
                className="w-full border p-3 rounded-lg mb-3"
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              {/* ⭐ STAR RATING */}
              <div className="mb-4">
                <p className="text-sm mb-1 text-gray-500">
                  Rating:
                </p>
                <div>{renderStars()}</div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-pink-400 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ratings?.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white/70 p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-semibold text-[#6d4b59]">
                  {item.name}
                </h3>

                <p className="text-sm text-yellow-400 mt-1">
                  {"★".repeat(item.rating ?? 0)}
                </p>

                <p className="text-sm text-[#7b5a68] mt-2">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}