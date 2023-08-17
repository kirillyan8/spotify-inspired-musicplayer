"use client";

import React, { FC } from "react";
import { Song } from "@/types";
import useUploadSong from "@/hooks/userActions/useUploadSong";
import LibraryItem from "@/components/LibraryItem";
import useOnPlay from "@/hooks/useOnPlay";
import LibraryItemContainer from "@/components/LibraryItemContainer";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  const { uploadSong } = useUploadSong();
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <p className="px-6 text-sm text-neutral-500">
        No songs found, feel free to{" "}
        <span
          onClick={uploadSong}
          className="cursor-pointer underline hover:text-neutral-400"
        >
          add
        </span>{" "}
        them!
      </p>
    );
  }
  return (
    <LibraryItemContainer>
      {songs.map((song) => (
        <LibraryItem
          key={song.id}
          song={song}
          onClick={() => onPlay(song.id)}
          renderLike={true}
        />
      ))}
    </LibraryItemContainer>
  );
};

export default SearchContent;
