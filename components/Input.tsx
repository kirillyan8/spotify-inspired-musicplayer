import React, { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <input
          className={twMerge(
            "w-full rounded-md bg-neutral-700 px-3 py-2 text-sm text-neutral-50 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
          ref={ref}
        />
        {error ? <div className="text-red-400">{error}</div> : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
