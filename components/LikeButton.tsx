"use client";

import React, { FC } from "react";
import useLikeSong from "@/hooks/userActions/useLikeSong";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ songId }) => {
  const { isLiked, handleLike, Icon } = useLikeSong(songId);

  return (
    <button
      className={`${
        !isLiked ? "active:scale-125" : "active:scale-75"
      } transition hover:scale-110 hover:opacity-75`}
      onClick={handleLike}
    >
      <Icon size={25} color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default LikeButton;
