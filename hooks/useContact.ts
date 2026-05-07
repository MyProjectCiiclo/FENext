import { useState } from "react";
import toast from "react-hot-toast";
import { ContactForm } from "@/types/contact";
import { contactService } from "@/services/contact.service";

export function useContact() {
  const [loading, setLoading] = useState(false);

  const sendContact = async (payload: ContactForm) => {
    setLoading(true);

    try {
      await contactService.sendContact(payload);
      toast.success("Send success!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    sendContact,
    loading,
  };
}