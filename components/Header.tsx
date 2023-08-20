"use client";

import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import useSignInModal from "@/hooks/modals/useSignInModal";
import Button from "@/components/Button";
import useSignUpModal from "@/hooks/modals/useSignUpModal";
import useLikedSongs from "@/hooks/stores/useLikedSongs";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen: openSignInModal } = useSignInModal();
  const { onOpen: openSignUpModal } = useSignUpModal();
  const resetLikedSongs = useLikedSongs((state) => state.reset);

  const supabaseClient = useSupabaseClient();
  const User = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
    router.refresh();
    resetLikedSongs();
  };

  return (
    <header
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-700 p-6",
        className,
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="mb-4 hidden items-center justify-between gap-x-2 md:flex">
          <button
            className="flex items-center justify-center rounded-full bg-black text-white transition hover:opacity-60"
            onClick={() => router.back()}
            aria-label="Go back"
            title="Back"
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            className="flex items-center justify-center rounded-full bg-black text-white transition hover:opacity-60"
            onClick={() => router.forward()}
            aria-label="Go forward"
            title="Forward"
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className="flex gap-x-2 md:hidden">
          <button
            className="rounded-full bg-white p-2 text-black hover:opacity-75"
            onClick={() => router.push("/")}
          >
            <HiHome size={20} />
          </button>
          <button
            className="rounded-full bg-white p-2 text-black hover:opacity-75"
            onClick={() => router.push("/search")}
          >
            <BiSearch size={20} />
          </button>
        </div>
        {User ? (
          <div className="flex items-center gap-x-4">
            <Button onClick={handleLogout} className="bg-white px-6 py-2">
              Logout
            </Button>
            <div className="w-fit rounded-full bg-white px-3 py-3 text-black">
              <FaUserAlt />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-x-4">
            <Button
              className="bg-transparent font-medium text-neutral-300"
              onClick={openSignUpModal}
            >
              Sign up
            </Button>
            <Button
              className="bg-white px-6 py-2 text-black"
              onClick={openSignInModal}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      {children}
    </header>
  );
};

export default Header;
