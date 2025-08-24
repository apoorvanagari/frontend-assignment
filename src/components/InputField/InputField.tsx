import { useId, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";

export type InputVariant = "filled" | "outlined" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  clearable?: boolean;
  passwordToggle?: boolean;
  loading?: boolean;
  className?: string;
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  passwordToggle,
  loading,
  className,
}: InputFieldProps) {
  const id = useId();
  const [localType, setLocalType] = useState(type);

  const sizeStyles = {
    sm: "h-9 text-sm px-3 rounded-lg",
    md: "h-10 text-base px-3.5 rounded-xl",
    lg: "h-12 text-lg px-4 rounded-2xl",
  } as const;

  const variantStyles = {
    outlined:
      "bg-white border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
    filled:
      "bg-gray-100 border border-transparent focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
    ghost:
      "bg-transparent border border-transparent focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
  } as const;

  const invalidStyles = invalid
    ? "border-red-500 focus:border-red-600 focus:ring-red-600/10"
    : "";

  const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "";

  const input = (
    <div className={cx("relative", className)}>
      <input
        id={id}
        aria-invalid={invalid || !!errorMessage || undefined}
        aria-describedby={
          helperText || errorMessage ? `${id}-desc` : undefined
        }
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={localType}
        className={cx(
          "w-full outline-none transition-shadow",
          sizeStyles[size],
          variantStyles[variant],
          invalidStyles,
          disabledStyles,
          loading && "pr-10"
        )}
      />

      {loading && (
        <span className="absolute inset-y-0 right-3 flex items-center">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </span>
      )}

      {clearable && !!value && !disabled && (
        <button
          type="button"
          aria-label="Clear input"
          className="absolute inset-y-0 right-2 flex items-center px-1 rounded-md hover:bg-gray-100"
          onClick={() => onChange?.({ target: { value: "" } } as any)}
        >
          ×
        </button>
      )}

      {passwordToggle && type === "password" && (
        <button
          type="button"
          aria-label={localType === "password" ? "Show password" : "Hide password"}
          className="absolute inset-y-0 right-2 flex items-center px-2 rounded-md hover:bg-gray-100"
          onClick={() =>
            setLocalType((t) => (t === "password" ? "text" : "password"))
          }
        >
          {localType === "password" ? "👁️" : "🙈"}
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      {input}
      {(helperText || errorMessage) && (
        <p
          id={`${id}-desc`}
          className={cx(
            "mt-1 text-sm",
            errorMessage ? "text-red-600" : "text-gray-600"
          )}
        >
          {errorMessage ?? helperText}
        </p>
      )}
    </div>
  );
}
