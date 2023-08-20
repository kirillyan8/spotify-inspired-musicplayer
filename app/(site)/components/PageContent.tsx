"use client";

import React, { FC } from "react";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadSong from "@/hooks/userActions/useUploadSong";

import SongItem from "@/components/SongItem";
import MessageBox from "@/components/MessageBox";
import MessageBoxLink from "@/components/MessageBoxLink";

interface PageContentProps {
  songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { uploadSong } = useUploadSong();

  if (songs.length === 0) {
    return (
      <MessageBox className="mt-3 px-0">
        No songs available. Feel free to{" "}
        <MessageBoxLink onClick={uploadSong}>add</MessageBoxLink> one!
      </MessageBox>
    );
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
