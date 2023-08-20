"use client";

import React, { FC } from "react";

import { Song } from "@/types";
import Link from "next/link";
import LibraryItem from "@/components/LibraryItem";
import useSignInModal from "@/hooks/modals/useSignInModal";
import useSignUpModal from "@/hooks/modals/useSignUpModal";
import useOnPlay from "@/hooks/useOnPlay";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import LibraryItemContainer from "@/components/LibraryItemContainer";
import MessageBox from "@/components/MessageBox";
import MessageBoxLink from "@/components/MessageBoxLink";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({ songs }) => {
  const user = useUser();
  const { isLoading } = useSessionContext();
  const { onOpen: openSignInModal } = useSignInModal();
  const { onOpen: openSignUpModal } = useSignUpModal();
  const onPlay = useOnPlay(songs);

  if (!user && !isLoading) {
    return (
      <MessageBox>
        In order to save songs and listen them again you need to{" "}
        <MessageBoxLink onClick={openSignUpModal}>sign up</MessageBoxLink> or{" "}
        <MessageBoxLink onClick={openSignInModal}>login</MessageBoxLink>.
      </MessageBox>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="px-6">
        <p className="px-6 text-sm text-neutral-500">
          No liked songs yet. Let&lsquo;s{" "}
          <Link href="/search" className="underline hover:text-neutral-400">
            find
          </Link>{" "}
          some!
        </p>
      </div>
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

export default LikedContent;
