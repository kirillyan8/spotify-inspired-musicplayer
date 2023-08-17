"use client";

import React, { FC } from "react";
import Image from "next/image";

import { Song } from "@/types";
import useLoadImageUrl from "@/hooks/useLoadImageUrl";
import LikeButton from "@/components/LikeButton";
import { twMerge } from "tailwind-merge";

interface LibraryItemProps {
  song: Song;
  onClick?: (id: string) => void;
  renderLike?: boolean;
  className?: string;
}

const LibraryItem: FC<LibraryItemProps> = ({
  song,
  onClick,
  renderLike = false,
  className,
}) => {
  const songImage = useLoadImageUrl(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex cursor-pointer gap-x-4 rounded-md bg-neutral-900 p-1 pr-3 hover:bg-neutral-800",
        className,
      )}
    >
      <div className="flex flex-1 gap-x-2">
        <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
          <Image
            src={songImage ?? "/images/placeholder.png"}
            width={48}
            height={48}
            alt="Song Image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="truncate font-bold">{song.title}</p>
          <p className="truncate text-sm text-neutral-500">{song.author}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-4">
        {renderLike && <LikeButton songId={song.id} />}
      </div>
    </div>
  );
};

export default LibraryItem;
