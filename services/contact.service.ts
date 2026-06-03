import { Contact } from "@/types";
import api from "../lib/api";

export const contactService = {
  async sendContact(payload: Contact) {
    try {
      const response = await api.post("/contact", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getContact() {
    try {
      const response = await api.get("/contact/list");
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteContact(id: number) {
    try {
      const response = await api.delete(`/contact/destroy/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
