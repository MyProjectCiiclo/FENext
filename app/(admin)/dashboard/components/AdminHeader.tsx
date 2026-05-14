"use client";

export default function Header() {
  return (
    <header className="bg-white mb-5 rounded-xl w-full">
      <input
        type="text"
        placeholder="Search anything..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
      />
    </header>
  );
}