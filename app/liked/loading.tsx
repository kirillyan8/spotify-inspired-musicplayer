"use client"

import React from 'react';

import Box from "@/components/Box";
import {BeatLoader} from "react-spinners";

const Loading = () => {
  return (
    <Box className="w-full h-full justify-center items-center flex">
      <BeatLoader size={20} color="#22c55e"/>
    </Box>
  );
};

export default Loading;
