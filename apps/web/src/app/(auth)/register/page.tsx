"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { RegisterFormData } from "@/types/auth/auth.types";
import{ Input,Button }from "$domains/application";


export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //Extract value directly from the form
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    //create registration data
    const registerData: RegisterFormData = {
      fullName,
      username,
      email,
      password,
      confirmPassword,
    };

    // check password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);

      const respose = await api.post("/users/register", registerData);
      setSuccess(respose.data.message || "Registration successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
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

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-sm text-center mb-3">{success}</p>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
            />

            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />

            <Button type="submit" loading={loading}>
              {loading ? "Registration user..." : "Sign Up"}

            </Button>

            {/* <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button> */}
          </form>

          <p className="text-xs text-gray-500 text-center mt-5 leading-5">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </p>
        </div>

        {/* Login Link */}
        <div className="bg-white border border-gray-200 rounded-lg mt-3 py-5 text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
