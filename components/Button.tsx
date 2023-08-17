import React, { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "w-fit rounded-full bg-green-500 px-3 py-3 font-bold text-black transition hover:opacity-75 " +
          "active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
