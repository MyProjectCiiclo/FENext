"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Trash2, Quote } from "lucide-react";
import { useRating } from "@/hooks/useRating";
import { Rating } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function RatingManagement() {
  const { ratings, loading, deleteRating } = useRating();

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const isLoading = loading;

  const totalPages = Math.ceil(ratings.length / pageSize);

  const currentData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return ratings.slice(start, start + pageSize);
  }, [ratings, page]);

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-400 via-pink-300 to-rose-200" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <MessageSquare className="text-pink-400" size={34} />
      </div>

      <div className="px-8 pb-8 pt-16">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-[#6d4b59]">
            Client Reviews
          </h2>
        </div>

        {isLoading ? (
          <div className="mt-10">
            <LoadingSpinner />
          </div>
        ) : currentData.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No ratings yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {currentData.map((review: Rating) => (
              <div
                key={review.id}
                className="relative bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="h-32 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                  <Quote size={42} className="text-pink-400" />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-[#6d4b59]">
                    {review.name}
                  </h3>

                  <p className="text-sm text-[#7b5a68] leading-6 line-clamp-4">
                    {review.message}
                  </p>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span key={index} className="text-pink-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={() => {
                        const ok = window.confirm(
                          "Are you sure you want to delete this rating?"
                        );

                        if (ok) deleteRating(review.id);
                      }}
                      className="bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && ratings.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-xl bg-pink-500 text-white disabled:opacity-40"
            >
              Previous
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-xl bg-pink-500 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}