"use client";

import React from "react";

import Box from "@/components/Box";
import Header from "@/components/Header";
import PageContainer from "@/components/PageContainer";

const Error = () => {
  return (
    <Box className="h-full w-full">
      <PageContainer>
        <Header>{}</Header>
        <div className="h-max w-full flex items-center justify-center mt-10">
          <p className="text-neutral-500 text-lg">Something went wrong</p>
        </div>
      </PageContainer>
    </Box>
  );
};

export default Error;
