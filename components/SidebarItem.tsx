import React, { FC } from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 font-medium " +
          "py-1 text-lg text-neutral-400 transition hover:text-white",
        active && "text-white",
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default SidebarItem;
