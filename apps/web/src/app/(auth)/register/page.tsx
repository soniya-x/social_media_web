
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Input,
  Button,
  useAppDispatch,
  useAppSelector,
} from "$domains/application";

import {
  registerSchema,
  RegisterFormData,
  registerAction,
} from "$domains/register";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get registration loading and error states from Redux
  const { isLoading, error } = useAppSelector(
    (state) => state.register
  );

  // Success message is local UI state
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // Handle registration using Redux thunk
  const onSubmit = async (registerData: RegisterFormData) => {
    setSuccess("");

    try {
      const response = await dispatch(
        registerAction(registerData)
      ).unwrap();

      setSuccess(
        response.message || "Registration successful!"
      );

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch {
      // Error is already handled by Redux
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-6 sm:px-6 sm:py-10">

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto">

        {/* Registration Card */}
        <div className="rounded-xl border border-border bg-card text-card-foreground p-5 sm:p-7 md:p-8 shadow-sm">

          {/* Logo */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 tracking-tight text-foreground">
            SocialGram
          </h1>

          <p className="text-center text-muted-foreground font-medium text-sm sm:text-base mb-6">
            Sign up to see photos and posts from your friends.
          </p>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="text-destructive text-sm text-center mb-3 break-words"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              role="status"
              className="text-sm text-center mb-3 text-green-600 dark:text-green-400 break-words"
            >
              {success}
            </p>
          )}

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Full Name */}
            <Input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            {/* Username */}
            <Input
              type="text"
              placeholder="Username"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />

            {/* Email */}
            <Input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <Input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Confirm Password */}
            <Input
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 rounded-lg font-semibold"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Terms and Conditions */}
          <p className="text-xs text-muted-foreground text-center mt-5 leading-5">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </p>

        </div>

        {/* Login Link */}
        <div className="rounded-xl border border-border bg-card text-card-foreground mt-3 px-3 py-5 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
