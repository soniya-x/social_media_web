
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

interface RegisterFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);

    alert("Registration form submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Registration Card */}
        <div className="bg-white border border-gray-200 rounded-lg px-8 py-8">

          {/* Logo */}
          <h1 className="text-4xl font-bold text-center mb-3 tracking-tight">
            SocialGram
          </h1>

          <p className="text-center text-gray-500 font-semibold text-base mb-6">
            Sign up to see photos and posts from your friends.
          </p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Sign Up
            </button>

          </form>

          <p className="text-xs text-gray-500 text-center mt-5 leading-5">
            By signing up, you agree to our Terms,
            Privacy Policy and Cookies Policy.
          </p>

        </div>

        {/* Login Link */}
        <div className="bg-white border border-gray-200 rounded-lg mt-3 py-5 text-center">

          <p className="text-sm text-gray-700">
            Already have an account?{" "}

            <Link
              href="/login"
              className="text-blue-500 font-semibold"
            >
              Log in
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}
