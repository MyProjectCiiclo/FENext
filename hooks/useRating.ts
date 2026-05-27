import { useState } from "react";
import toast from "react-hot-toast";

import { Rating } from "@/types";
import { ratingService } from "@/services";

export function useRating() {
  const [loading, setLoading] = useState(false);

  const [ratings, setRatings] = useState<Rating[]>([]);

  const getRating = async () => {
    setLoading(true);

    try {
      const data = await ratingService.getRating();

      setRatings(data ?? []);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id: number) => {
    setLoading(true);

    try {
      await ratingService.deleteRating(id);

      setRatings((prev) =>
        prev.filter((rating) => rating.id !== id)
      );

      toast.success("Delete success!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    getRating,
    deleteRating,

    loading,
    ratings,
  };
}