"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { LoginFormData } from "@/types/auth/auth.types";
import{ Input,Button }from "$domains/application";

export default function LoginPage() {
  const router = useRouter();
  // const [formData, setFormData] = useState<LoginFormData>({
  //   email: "",
  //   password: "",
  // });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    //exctract value directly from the form
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //create login data
    const loginData: LoginFormData = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await api.post("/users/login", loginData);
      const { token, user } = response.data;

      //store jwt tokena and user information
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      //redirect to home page
      router.push("/home");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
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
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            {/* Login Button */}
            {/* <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {loading ? "Logging in..." : "Log In"}
            </button> */}
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
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
            <Link href="/register" className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
