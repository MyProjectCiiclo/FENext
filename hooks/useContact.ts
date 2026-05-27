import { useState } from "react";
import toast from "react-hot-toast";
import { contactService } from "@/services";
import { Contact } from "@/types";

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalContacts, setTotalContacts] = useState(0);

  const sendContact = async (payload: Contact) => {
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

  const getContact = async () => {
    setLoading(true);

    try {
      const res = await contactService.getContact();

      const data = res?.data?.data;

      setContacts(data?.data ?? []);
      setTotalContacts(data?.totalContacts ?? 0);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: number) => {
    setLoading(true);

    try {
      await contactService.deleteContact(id);

      setContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );

      setTotalContacts((prev) => prev - 1);

      toast.success("Delete success!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    sendContact,
    getContact,
    deleteContact,

    loading,
    contacts,
    totalContacts,
  };
}