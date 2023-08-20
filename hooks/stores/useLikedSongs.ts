import { create } from "zustand";

interface LikedSongsStore {
  likedSongs: Record<string, boolean>;
  likeSong: (songId: string) => void;
  unlikeSong: (songId: string) => void;
  reset: () => void;
}

const useLikedSongs = create<LikedSongsStore>((set) => ({
  likedSongs: {},
  likeSong: (songId: string) =>
    set((state) => ({ likedSongs: { ...state.likedSongs, [songId]: true } })),
  unlikeSong: (songId: string) =>
    set((state) => ({ likedSongs: { ...state.likedSongs, [songId]: false } })),
  reset: () => set({ likedSongs: {} }),
}));

export default useLikedSongs;
