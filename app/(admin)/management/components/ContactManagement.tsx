"use client";

import { useMemo, useState } from "react";
import { Mail, Trash2, Phone } from "lucide-react";

import { useContact } from "@/hooks/useContact";
import { Contact } from "@/types";
import LoadingSpinner from "@/shared/Loading";

export default function ContactManagement() {
  const { contacts, deleteContact, loading } = useContact();

  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const pageSize = 9;

  const totalPages = Math.ceil(contacts.length / pageSize);

  const currentData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return contacts.slice(start, start + pageSize);
  }, [contacts, page]);

  return (
    <section className="relative bg-white rounded-[32px] border border-pink-100 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-pink-400 via-pink-300 to-rose-200" />

      <div className="absolute left-8 top-14 w-20 h-20 rounded-3xl bg-white border-4 border-pink-100 shadow-xl flex items-center justify-center">
        <Mail className="text-pink-400" size={34} />
      </div>

      <div className="px-8 pb-8 pt-16">
        <h2 className="text-3xl font-bold text-[#6d4b59] mt-6">
          Contacts
        </h2>

        {loading ? (
          <div className="mt-10">
            <LoadingSpinner />
          </div>
        ) : currentData.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No contacts yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {currentData.map((contact: Contact) => (
              <div
                key={contact.id}
                className="relative bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="h-32 bg-gradient-to-r from-pink-100 to-rose-100 flex items-center justify-center">
                  <Phone size={40} className="text-pink-400" />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-lg text-[#6d4b59]">
                    {contact.name}
                  </h3>

                  <p className="text-sm text-[#7b5a68]">
                    {contact.email}
                  </p>

                  <p className="text-sm text-[#7b5a68] line-clamp-2">
                    {contact.message}
                  </p>

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => setDeleteId(contact.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-xl bg-pink-400 text-white hover:bg-pink-500 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="font-semibold text-[#6d4b59]">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-xl bg-pink-400 text-white hover:bg-pink-500 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-[420px] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-[#6d4b59]">
              Confirm Delete
            </h2>

            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this contact? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (deleteId !== null) {
                    deleteContact(deleteId);
                    setDeleteId(null);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


