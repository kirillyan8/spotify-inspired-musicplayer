import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { twMerge } from "tailwind-merge";

import getSongsByUserId from "@/lib/actions/getSongsByUserId";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import Main from "@/components/Main";

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Spotify Inspired MusicPlayer",
  description: "Music everywhere, just listen!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={twMerge(font.className, "flex h-full")}>
        <ToastProvider />
        <SupabaseProvider>
            <ModalProvider />
            <Sidebar songs={songs} />
            <Main>
              {children}
            </Main>
            <Player />
        </SupabaseProvider>
      </body>
    </html>
  );
}
