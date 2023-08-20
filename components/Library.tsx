"use client";

import React, { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@supabase/auth-helpers-react";

import { Song } from "@/types";
import useUploadSong from "@/hooks/userActions/useUploadSong";
import useOnPlay from "@/hooks/useOnPlay";
import LibraryItem from "@/components/LibraryItem";
import MessageBox from "@/components/MessageBox";
import MessageBoxLink from "@/components/MessageBoxLink";
import useSignInModal from "@/hooks/modals/useSignInModal";
import useSignUpModal from "@/hooks/modals/useSignUpModal";

interface LibraryProps {
  songs: Song[];
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const { uploadSong } = useUploadSong();
  const onPlay = useOnPlay(songs);
  const user = useUser();
  const { onOpen: openSignInModal } = useSignInModal();
  const { onOpen: openSignUpModal } = useSignUpModal();

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
        {!user ? (
          <>
            <MessageBox>Only authenticated users can upload songs.</MessageBox>
            <MessageBox>
              <MessageBoxLink onClick={openSignInModal}>Login</MessageBoxLink>{" "}
              or{" "}
              <MessageBoxLink onClick={openSignUpModal}>Sign up</MessageBoxLink>
            </MessageBox>
          </>
        ) : songs.length === 0 ? (
          <MessageBox>
            There is no songs yet, try{" "}
            <MessageBoxLink onClick={uploadSong}>upload</MessageBoxLink> one!
          </MessageBox>
        ) : (
          songs.map((song) => (
            <LibraryItem
              song={song}
              onClick={() => onPlay(song.id)}
              key={song.id}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Library;
