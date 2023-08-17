"use client";

import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import usePlayer from "@/hooks/usePlayer";

interface MainProps extends PropsWithChildren {}

const Main: FC<MainProps> = ({ children }) => {
  const player = usePlayer();

  return (
    <main
      className={twMerge(
        "h-full flex-1 overflow-y-auto md:py-2 md:pr-2",
        player.activeId && "h-[calc(100%-100px)]",
      )}
    >
      {children}
    </main>
  );
};

export default Main;
