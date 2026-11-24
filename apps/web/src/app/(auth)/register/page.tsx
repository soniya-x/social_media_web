"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import api from "@/lib/axios";
import { RegisterFormData } from "@/types/auth/auth.types";
import{ Input,Button }from "$domains/application";
=======

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";

import { Input, Button } from "$domains/application";

import {
  registerSchema,
  RegisterFormData,
} from "$domains/register";
>>>>>>> origin/feat/form-implementation-and-redux-setup


export default function RegisterPage() {
  const router = useRouter();
<<<<<<< HEAD
=======

>>>>>>> origin/feat/form-implementation-and-redux-setup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

<<<<<<< HEAD
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
=======
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
>>>>>>> origin/feat/form-implementation-and-redux-setup
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
<<<<<<< HEAD
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
=======
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
>>>>>>> origin/feat/form-implementation-and-redux-setup
          )}

          {/* Success Message */}
          {success && (
<<<<<<< HEAD
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
=======
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

>>>>>>> origin/feat/form-implementation-and-redux-setup
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
<<<<<<< HEAD
            <Link href="/login" className="text-blue-500 font-semibold">
=======
            <Link
              href="/login"
              className="text-blue-500 font-semibold"
            >
>>>>>>> origin/feat/form-implementation-and-redux-setup
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
