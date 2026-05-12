import api from "../lib/api";
import { ContactForm } from "@/types/contact.type";

export const contactService = {
  async sendContact(payload: ContactForm) {
    try {
      const response = await api.post("/contact", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};