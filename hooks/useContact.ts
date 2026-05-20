import { useState } from "react";
import toast from "react-hot-toast";
import { ContactForm } from "@/types";
import { contactService } from "@/services";

export function useContact() {
  const [loading, setLoading] = useState(false);

  const sendContact = async (payload: ContactForm) => {
    setLoading(true);

    try {
      const res = await contactService.sendContact(payload);
      return res;
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
