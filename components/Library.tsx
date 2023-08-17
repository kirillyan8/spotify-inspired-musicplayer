"use client";

import React, { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import LibraryItem from "@/components/LibraryItem";
import useUploadSong from "@/hooks/userActions/useUploadSong";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const { uploadSong } = useUploadSong();
  const onPlay = useOnPlay(songs);

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} />
          <h2>Your Library</h2>
        </div>
        <button onClick={uploadSong} title="Add song">
          <AiOutlinePlus className="cursor-pointer transition hover:text-white" />
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((song) => (
          <LibraryItem
            song={song}
            onClick={() => onPlay(song.id)}
            key={song.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Library;
