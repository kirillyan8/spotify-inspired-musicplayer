"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IconType } from "react-icons";

import { Song } from "@/types";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";
import { twMerge } from "tailwind-merge";
import usePlayer from "@/hooks/usePlayer";

interface SidebarProps {
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ songs }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes: {
    icon: IconType;
    label: string;
    active: boolean;
    href: string;
  }[] = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname],
  );
  return (
    <aside
      className={twMerge(
        "hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex",
        player.activeId && "h-[calc(100%-100px)]",
      )}
    >
      <Box>
        <nav className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>
      </Box>
      <Box className="h-full overflow-y-auto">
        <Library songs={songs} />
      </Box>
    </aside>
  );
};

export default Sidebar;
