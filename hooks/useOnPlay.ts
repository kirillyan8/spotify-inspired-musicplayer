import { Song } from "@/types";

import usePlayer from "./stores/usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();

  return (id: string) => {
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
};

export default useOnPlay;
