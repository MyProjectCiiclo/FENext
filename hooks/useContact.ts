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
    mutationFn: (payload: Contact) =>
      contactService.sendContact(payload),

    onSuccess: () => {
      toast.success("Send success!");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactService.deleteContact(id),

    onSuccess: () => {
      toast.success("Delete success!");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
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