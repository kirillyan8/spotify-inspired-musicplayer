"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();

  return (
    <button
      className="group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
      onClick={() => router.push(href)}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          src={image}
          alt="image"
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
      <p className="truncate font-semibold text-white">{name}</p>
      <div className="absolute right-4 rounded-full bg-green-500 p-3 text-black opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100">
        <FaPlay />
      </div>
    </button>
  );
};

export default ListItem;
