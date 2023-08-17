import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

const PageContainer: FC<PageContainerProps> = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "h-full w-full overflow-hidden overflow-y-auto bg-neutral-900 md:rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
