"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { contactService } from "@/services";
import { Contact } from "@/types";

export function useContact() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await contactService.getContact();

      return res?.data?.data?.data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const sendMutation = useMutation({
    mutationFn: (payload: Contact) => contactService.sendContact(payload),

    onMutate: () => {
      toast.loading("Sending message...", { id: "contact" });
    },

    onSuccess: () => {
      toast.success("Message sent successfully!", { id: "contact" });
    },

    onError: () => {
      toast.error("Failed to send message", { id: "contact" });
    },
  });

const deleteMutation = useMutation({
  mutationFn: (id: number) => contactService.deleteContact(id),

  onMutate: () => {
    toast.loading("Deleting loading...", { id: "contacts" });
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
    toast.success("Delete success!", { id: "contacts" });
  },

  onError: () => {
    toast.error("Something went wrong", { id: "contacts" });
  },
});

  return {
    contacts: query.data ?? [],

    totalContacts: 0,

    loading: query.isLoading,
    error: query.error,

    sendContact: sendMutation.mutate,
    deleteContact: deleteMutation.mutate,

    isSending: sendMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
