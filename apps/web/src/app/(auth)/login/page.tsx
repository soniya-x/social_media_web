"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login Data:", formData);
    alert("Login form submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-lg px-8 py-10">

          <h1 className="text-4xl font-bold text-center mb-3 tracking-tight">
            SocialGram
          </h1>

          <p className="text-center text-gray-500 text-sm mb-8">
            Log in to connect with your friends.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Log In
            </button>

          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-gray-400 text-xs font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-900 hover:text-blue-600"
            >
              Forgot password?
            </Link>
          </div>

        </div>

        {/* Registration Link */}
        <div className="bg-white border border-gray-200 rounded-lg mt-3 py-5 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}