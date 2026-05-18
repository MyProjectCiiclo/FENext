"use client";

import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { infoUser } = useUser();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await infoUser({
      email,
      password,
    });

    if (success) {
      setEmail("");
      setPassword("");

      router.push("/dashboard");
    }
    
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-pink-50">
      <div className="flex flex-col items-center p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md w-full max-w-[500px] border border-pink-100">
        <h1 className="text-2xl font-semibold mb-2 text-pink-400">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 mb-6">Admin login to continue</p>

        <div className="mb-4 w-full">
          <input
            className="w-full p-3 rounded-xl bg-gray-50 text-gray-800 
          border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 
          outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4 w-full">
          <input
            className="w-full p-3 rounded-xl bg-gray-50 text-gray-800 
          border border-gray-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 
          outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />
        </div>

        <p className="text-xs text-gray-400 mb-5">
          This system is restricted to admin only
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-[#FF4D8D] text-white font-medium
  hover:bg-[#ff2f7a] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
