import React, { FC, PropsWithChildren } from "react";

interface LibraryItemContainerProps extends PropsWithChildren {}

const LibraryItemContainer: FC<LibraryItemContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-y-2 px-6">{children}</div>;
};

export default LibraryItemContainer;
