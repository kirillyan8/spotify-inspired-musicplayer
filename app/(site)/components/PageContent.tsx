"use client";

import React, { FC } from "react";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <p className="text-sm text-neutral-500">No songs available.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((song) => (
        <SongItem key={song.id} onClick={() => onPlay(song.id)} song={song} />
      ))}
    </div>
  );
};

export default PageContent;
