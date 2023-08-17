import React from "react";
import Image from "next/image";

import getLikedSongs from "@/lib/actions/getLikedSongs";

import LikedContent from "./components/LikedContent";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";

export const revalidate = 0;

export const metadata = {
  title: "Liked songs",
  description: "All songs you love will appear here",
};

const LikedSongsPage = async () => {
  const songs = await getLikedSongs();

  return (
    <PageContainer>
      <Header>
        <div className="mt-6 flex flex-col items-center gap-4 px-6 md:mt-10 md:flex-row md:justify-start">
          <div className="relative h-28 w-28">
            <Image
              src="/images/liked.png"
              fill
              alt="Playlist image"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="hidden text-sm text-neutral-300 md:flex">Playlist</p>
            <h1 className="mb-2 text-3xl font-semibold text-white">
              Liked Songs
            </h1>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </PageContainer>
  );
};

export default LikedSongsPage;
