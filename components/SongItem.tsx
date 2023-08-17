"use client";

import React, { FC } from "react";
import Image from "next/image";

import { Song } from "@/types";
import useLoadImageUrl from "@/hooks/useLoadImageUrl";

import PlayButton from "@/components/PlayButton";

interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}

const SongItem: FC<SongItemProps> = ({ song, onClick }) => {
  const songImage = useLoadImageUrl(song);

  return (
    <article
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
      onClick={() => onClick(song.id)}
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image src={songImage ?? "/images/placeholder.png"} alt="image" fill />
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <p className="truncate pt-4 font-bold">{song.title}</p>
        <p className="truncate font-light text-neutral-500">By {song.author}</p>
      </div>
      <div className="absolute bottom-20 right-2 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <PlayButton />
      </div>
    </article>
  );
};

export default SongItem;
