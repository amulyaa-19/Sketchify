"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_HTTP_BACKEND_URL ?? "http://localhost:3002";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-gray-800 to-transparent opacity-20 rounded-tr-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_30%,rgba(120,120,120,0.15),transparent)] pointer-events-none"></div>

      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-700 text-white"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-black rounded hover:bg-blue-700 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-400 hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
