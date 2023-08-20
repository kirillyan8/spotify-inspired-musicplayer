"use client";

import React, { FC } from "react";
import { Song } from "@/types";
import useUploadSong from "@/hooks/userActions/useUploadSong";
import LibraryItem from "@/components/LibraryItem";
import useOnPlay from "@/hooks/useOnPlay";
import LibraryItemContainer from "@/components/LibraryItemContainer";
import MessageBox from "@/components/MessageBox";
import MessageBoxLink from "@/components/MessageBoxLink";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  const { uploadSong } = useUploadSong();
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <MessageBox>
        No songs found, feel free to{" "}
        <MessageBoxLink onClick={uploadSong}>add</MessageBoxLink> them!
      </MessageBox>
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
