"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";

import useSignInModal from "@/hooks/modals/useSignInModal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const useLikeSong = (songId: string) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { onOpen: openAuthModal } = useSignInModal();
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchLikeData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId)
        .single();

      if (data && !error) {
        setIsLiked(true);
      }
    };

    fetchLikeData();
  }, [user?.id, supabaseClient, songId]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async (e: any) => {
    e.stopPropagation();

    if (!user) {
      toast("You need to log in before continue", {
        icon: "🔒",
      });
      return openAuthModal();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        return toast.error("Something went wrong...");
      }

      setIsLiked(false);
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: user.id,
        song_id: songId,
      });

      if (error) {
        return toast.error("Something went wrong...");
      }

      setIsLiked(true);
    }

    router.refresh();
  };
  return {
    Icon,
    isLiked,
    handleLike,
  };
};

export default useLikeSong;
