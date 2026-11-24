
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Input, Button } from "$domains/application";

import { resetPasswordSchema } from "../types/resetPasswordSchema";

import type {
  ResetPasswordFormData,
  ResetPasswordFormProps,
} from "../types/resetPasswordType";

import { resetPasswordServices } from "../services/resetPasswordServices";

export default function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Submit the new password to the backend.
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setServerError("");
      setSuccessMessage("");

      await resetPasswordServices(token, data);

      // Show success message after successful API response.
      setSuccessMessage("Password reset successfully!");

      // Redirect the user to login.
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      // Handle errors returned by Axios.
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
            "Unable to reset password. Please try again."
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password">New Password</label>

          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            disabled={isSubmitting}
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            disabled={isSubmitting}
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="text-sm text-red-500">{serverError}</p>
        )}

        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
