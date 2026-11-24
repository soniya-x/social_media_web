
"use client";

// React state for displaying API success and error messages
import { useState } from "react";

// React Hook Form manages form values and submission
import { useForm } from "react-hook-form";

// Connect Zod validation with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

// Reuse existing shadcn UI components
import {
  Input,
  Button
} from "$domains/application";

// Import Zod validation schema
import { forgotPasswordSchema } from "../types/forgotPasswordSchema";

// Import form data type generated from Zod
import type { ForgotPasswordFormData } from "../types/forgotPasswordSchema";

// Import service responsible for calling the backend API
import { forgotPasswordServices } from "../services/forgotPasswordServices";

export default function ForgotPasswordForm() {

  // Store API error message
  const [serverError, setServerError] = useState("");

  // Store API success message
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize React Hook Form
  const {
    register,       // Connect input fields with React Hook Form
    handleSubmit,   // Handle form submission
    formState: {
      errors,       // Store Zod validation errors
      isSubmitting, // Track API submission/loading state
    },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Execute this function after successful form validation
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Clear previous messages before making a new request
      setServerError("");
      setSuccessMessage("");

      // Send the user's email to the backend
      const response = await forgotPasswordServices(data);

      // Display the success message returned by the backend
      setSuccessMessage(response.message);

    } catch (error: unknown) {

      // Extract API error message if available
      const message =
        error instanceof Error
          ? error.message
          : "Unable to process request. Please try again.";

      // Display error message to the user
      setServerError(message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">

      {/* Forgot password heading and description */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          Forgot Password?
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your registered email address.
          We'll send you a password reset link.
        </p>
      </div>

      {/* Submit form after React Hook Form validation */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        {/* Email input field */}
        <div className="space-y-2">
          <label htmlFor="email">Email Address</label>

          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {/* Display email validation error */}
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Display backend error message */}
        {serverError && (
          <p className="text-sm text-red-500">
            {serverError}
          </p>
        )}

        {/* Display backend success message */}
        {successMessage && (
          <p className="text-sm text-green-600">
            {successMessage}
          </p>
        )}

        {/* Submit button with loading state */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>

      </form>
    </div>
  );
}
