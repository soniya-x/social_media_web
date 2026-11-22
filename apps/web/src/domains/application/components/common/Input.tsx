
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={props.id || props.name}
        {...props}
        className={`w-full bg-gray-50 border border-gray-300 rounded px-3 py-3 text-sm outline-none focus:border-gray-500 ${className}`}
      />
    </div>
  );
}
