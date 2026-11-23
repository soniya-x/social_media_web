
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";

import { Input, Button } from "$domains/application";

import {
  registerSchema,
  RegisterFormData,
} from "$domains/register";


export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // Handle form submission
  const onSubmit = async (registerData: RegisterFormData) => {
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await api.post(
        "/users/register",
        registerData
      );

      setSuccess(
        response.data.message || "Registration successful!"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error: unknown) {
      const message =
        (error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        }).response?.data?.message ||
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
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-sm text-center mb-3">
              {success}
            </p>
          )}

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
          >

            {/* Full Name */}
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <Input
                type="text"
                placeholder="Username"
                {...register("username")}
              />

              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

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
