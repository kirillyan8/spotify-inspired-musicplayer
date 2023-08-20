import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <div className="rounded-full bg-green-500 p-4 text-black transition hover:scale-110 ">
      <FaPlay />
    </div>
  );
};

export default PlayButton;
