"use client";

import React, { FC, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useAudio } from "react-use";
import { twMerge } from "tailwind-merge";

import { Song } from "@/types";
import usePlayer from "@/hooks/stores/usePlayer";
import LibraryItem from "@/components/LibraryItem";
import VolumeSlider from "@/components/VolumeSlider";
import SongTimeControlSlider from "@/components/SongTimeControlSlider";
import transformSecondsToMinutes from "@/lib/transformSecondsToMinutes";

interface PlayerContentProps {
  songUrl: string;
  song: Song;
}

const PlayerContent: FC<PlayerContentProps> = ({ songUrl, song }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const isAnyOtherSongs = player.ids.length > 1;

  const [audio, state, controls] = useAudio({
    src: songUrl,
    autoPlay: true,
    onPlay: () => {
      setIsPlaying(true);
      controls.volume(
        localStorage.getItem("player-volume")
          ? Number(localStorage.getItem("player-volume"))
          : 0.5,
      );
    },
    onPause: () => {
      setIsPlaying(false);
    },
    onEnded: () => {
      onPlayNext();
    },
  });

  const PlayIcon = isPlaying ? FaPause : FaPlay;
  const SoundIcon = state.volume === 0 ? HiMiniSpeakerXMark : HiMiniSpeakerWave;

  const handlePlay = () => {
    if (!isPlaying) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  const handleVolumeChange = (volume: number) => {
    controls.volume(volume);
    localStorage.setItem("player-volume", String(volume));
  };

  const handleMute = () => {
    if (state.volume === 0) {
      handleVolumeChange(0.5);
    } else {
      handleVolumeChange(0);
    }
  };

  const onPlayPrevious = () => {
    if (!isAnyOtherSongs) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSongId = player.ids[currentIndex - 1];

    if (!previousSongId) {
      return player.setId(player.ids.at(-1)!);
    }
    return player.setId(previousSongId!);
  };

  const onPlayNext = () => {
    if (!isAnyOtherSongs) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSongId = player.ids[currentIndex + 1];

    if (!nextSongId) {
      return player.setId(player.ids.at(0)!);
    }
    return player.setId(nextSongId!);
  };

  return (
    <div className="grid h-full grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-2 flex h-full w-full items-center sm:col-span-1">
        <LibraryItem
          song={song}
          renderLike={true}
          className="w-fit cursor-auto bg-black hover:bg-black"
        />
        {audio}
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center md:col-span-2 md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-end gap-x-4 md:w-fit md:justify-center">
          <button
            className={twMerge(
              "hidden transition hover:scale-110 hover:opacity-70 active:opacity-50 md:flex",
              !isAnyOtherSongs &&
                "cursor-not-allowed opacity-25 hover:opacity-25 active:opacity-25",
            )}
            disabled={!isAnyOtherSongs}
            onClick={onPlayPrevious}
          >
            <FaStepBackward size={24} />
          </button>
          <button
            className="flex items-center justify-center rounded-full bg-green-600 p-4 transition hover:scale-110 active:bg-green-700"
            onClick={handlePlay}
          >
            <PlayIcon size={26} />
          </button>
          <button
            className={twMerge(
              "hidden transition hover:scale-110 hover:opacity-70 active:opacity-50 md:flex",
              !isAnyOtherSongs &&
                "cursor-not-allowed opacity-25 hover:opacity-25 active:opacity-25",
            )}
            disabled={!isAnyOtherSongs}
            onClick={onPlayNext}
          >
            <FaStepForward size={24} />
          </button>
        </div>
        <div className="hidden w-full items-center justify-center gap-x-4 px-3 md:flex md:max-w-[70%]">
          <p>{transformSecondsToMinutes(state.time)}</p>
          <SongTimeControlSlider
            currentTime={state.time}
            duration={state.duration}
            onChange={controls.seek}
          />
          <p>{transformSecondsToMinutes(state.duration)}</p>
        </div>
      </div>

      <div className="hidden h-full w-full items-center justify-end gap-x-4 px-4 lg:flex">
        <button
          onClick={handleMute}
          className="transition hover:scale-110 hover:opacity-75 active:opacity-50"
        >
          <SoundIcon size={36} />
        </button>
        <VolumeSlider
          value={state.volume}
          onChange={(value) => handleVolumeChange(value)}
        />
      </div>
    </div>
  );
};

export default PlayerContent;
