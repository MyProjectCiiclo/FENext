import api from "../lib/api";
import { ContactForm } from "@/types/contact.type";

export const contactService = {
  sendContact(payload: ContactForm) {
    return api.post("/contact", payload);
  },
};
