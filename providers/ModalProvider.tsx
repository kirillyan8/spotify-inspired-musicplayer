"use client";

import React, { useEffect, useState } from "react";

import SignInModal from "@/components/SignInModal";
import UploadModal from "@/components/UploadModal";
import SignUpModal from "@/components/SignUpModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SignInModal />
      <SignUpModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
