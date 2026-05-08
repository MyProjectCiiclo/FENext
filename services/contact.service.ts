import api from "./api";
import { ContactForm } from "@/types/contact";

export const contactService = {
  sendContact(payload: ContactForm) {
    return api.post("/contact", payload);
  },
};