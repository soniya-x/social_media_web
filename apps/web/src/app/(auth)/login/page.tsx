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

import {
  loginSchema,
  LoginFormData,
  loginAction,
} from "$domains/login";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (loginData: LoginFormData) => {
    try {
      await dispatch(loginAction(loginData)).unwrap();
      router.push("/home");
    } catch {
      // Error is already handled by Redux
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-xl border border-border bg-card text-card-foreground p-5 sm:p-7 md:p-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 tracking-tight text-foreground">
            SocialGram
          </h1>

          <p className="text-center text-muted-foreground text-sm sm:text-base mb-8">
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
                autoComplete="email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-destructive text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-destructive text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* API Error */}
            {error && (
              <p
                role="alert"
                className="text-destructive text-sm text-center break-words"
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 rounded-lg font-semibold"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-border" />
            <span className="text-muted-foreground text-xs font-semibold">
              OR
            </span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Registration Link */}
        <div className="rounded-xl border border-border bg-card text-card-foreground mt-3 px-3 py-5 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
