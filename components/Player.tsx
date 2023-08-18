"use client";

import React from "react";

import usePlayer from "@/hooks/stores/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

import PlayerContent from "@/components/PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!songUrl || !song || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 h-[100px] w-full bg-black px-4 py-2">
      <PlayerContent
        key={songUrl}
        songUrl={songUrl}
        song={song}
      />
    </div>
  );
};

export default Player;
