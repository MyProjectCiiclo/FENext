"use client";

import { useEffect } from "react";
import { Mail, Trash2, Phone } from "lucide-react";

import { useContact } from "@/hooks/useContact";
import { Contact } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function ContactManagement() {
  const { contacts, getContact, deleteContact } = useContact();

  useEffect(() => {
    getContact();
  }, []);

if (!contacts || contacts.length === 0) {
  return <LoadingSpinner />;
}
  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-500 via-pink-400 to-rose-300" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <Mail className="text-pink-500" size={34} />
      </div>

      <div className="px-8 pb-8 pt-16">
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-3xl font-bold text-gray-800">Contacts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {contacts.map((contact: Contact) => (
            <div
              key={contact.id}
              className="relative bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="h-32 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                <Phone size={40} className="text-pink-500" />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-gray-800">
                  {contact.name}
                </h3>

                <p className="text-sm text-gray-500">{contact.email}</p>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {contact.message}
                </p>

                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="bg-white/90 p-2 rounded-full shadow hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button className="px-4 py-2 rounded-xl bg-pink-500 text-white">
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            Total: {contacts.length}
          </span>

          <button className="px-4 py-2 rounded-xl bg-pink-500 text-white">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
