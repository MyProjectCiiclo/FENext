"use client";

import { useEffect } from "react";
import {
  MessageSquare,
  Trash2,
  Quote,
} from "lucide-react";

import { useRating } from "@/hooks/useRating";
import { Rating } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function RatingManagement() {
  const {
    ratings,
    getRating,
    deleteRating,
  } = useRating();

  useEffect(() => {
    getRating();
  }, []);
if (!ratings || ratings.length === 0) {
  return <LoadingSpinner />;
}
  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <MessageSquare
          className="text-pink-500"
          size={34}
        />
      </div>

      <div className="px-8 pb-8 pt-16">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Client Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {ratings.map((review: Rating) => (
            <div
              key={review.id}
              className="relative bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="h-32 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                <Quote
                  size={42}
                  className="text-pink-500"
                />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {review.name}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 leading-6 line-clamp-4">
                  {review.message}
                </p>

                <div className="flex items-center gap-1">
                  {Array.from({
                    length: review.rating,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="text-pink-500 text-lg"
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => {
                      const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this rating?"
                        );

                      if (confirmDelete) {
                        deleteRating(review.id);
                      }
                    }}
                    className="bg-white/90 p-2 rounded-full shadow hover:bg-red-50 transition"
                  >
                    <Trash2
                      size={18}
                      className="text-red-500"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="font-semibold text-gray-700">
            Total Ratings: {ratings.length}
          </span>
        </div>
      </div>
    </section>
  );
}