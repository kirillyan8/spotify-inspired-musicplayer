import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface MessageBoxProps extends PropsWithChildren {
  className?: string;
}

const MessageBox: FC<MessageBoxProps> = ({children, className}) => {
  return (
    <p className={twMerge("px-6 text-sm text-neutral-500", className)}>
      {children}
    </p>
  );
};

export default MessageBox;
