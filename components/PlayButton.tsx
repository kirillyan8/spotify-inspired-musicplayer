import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="rounded-full bg-green-500 p-4 text-black transition hover:scale-110 ">
      <FaPlay />
    </button>
  );
};

export default PlayButton;
