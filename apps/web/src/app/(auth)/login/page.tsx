"use client";

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

import { loginSchema, LoginFormData, loginAction } from "$domains/login";

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  // Get authentication state from Redux
  const { isLoading, error } = useAppSelector((state) => state.user);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // Handle Login
  const onSubmit = async (loginData: LoginFormData) => {
    try {
      await dispatch(loginAction(loginData)).unwrap();

      // Redirect after successful login
      router.push("/home");
    } catch {
      // Error is already handled by Redux
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
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

            {/* API Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
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
