"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

interface InputProps extends React.ComponentProps<typeof InputPrimitive> {
  label?: string;
  info?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  infoClassName?: string;
  errorClassName?: string;
}

function Input({
  className,
  type = "text",
  label,
  info,
  error,
  id,
  name,
  required,
  disabled,
  wrapperClassName,
  labelClassName,
  infoClassName,
  errorClassName,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const infoId = `${inputId}-info`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    props["aria-describedby"],
    info ? infoId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={cn("w-full space-y-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium text-foreground",
            disabled && "opacity-50",
            labelClassName
          )}
        >
          {label}

          {required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </label>
      )}

      <InputPrimitive
        {...props}
        id={inputId}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        aria-invalid={!!error || props["aria-invalid"] || undefined}
        aria-describedby={describedBy}
        data-slot="input"
        className={cn(
          "h-10 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:bg-input/30",
          className
        )}
      />

      {info && !error && (
        <p
          id={infoId}
          className={cn("text-xs text-muted-foreground", infoClassName)}
        >
          {info}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn("text-xs text-destructive", errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { Input };
export type { InputProps };