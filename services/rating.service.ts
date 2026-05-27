import { Rating } from "@/types";
import api from "../lib/api";

export const ratingService = {
  async getRating(): Promise<Rating[]> {
    try {
      const response = await api.get("/ratings");

      return response.data?.data ?? [];
    } catch (error) {
      throw error;
    }
  },

  async deleteRating(id: number) {
    try {
      const response = await api.delete(`/ratings/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};