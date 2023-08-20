import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface MessageBoxLinkProps extends PropsWithChildren {
  onClick?: () => void;
  href?: string;
  className?: string;
}

const MessageBoxLink: FC<MessageBoxLinkProps> = ({
  children,
  onClick,
  href,
  className,
}) => {
  if (onClick) {
    return (
      <span
        className={twMerge(
          "cursor-pointer underline hover:text-neutral-400",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }
  if (href) {
    return (
      <Link
        href={href}
        className={twMerge(
          "cursor-pointer underline hover:text-neutral-400",
          className,
        )}
      >
        {children}
      </Link>
    );
  }
  return null;
};

export default MessageBoxLink;
