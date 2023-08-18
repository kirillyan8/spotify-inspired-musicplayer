"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useSignInModal from "@/hooks/modals/useSignInModal";
import useLikedSongs from "@/hooks/stores/useLikedSongs";

const useLikeSong = (songId: string) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { onOpen: openAuthModal } = useSignInModal();
  const user = useUser();
  const isLiked = useLikedSongs((state) => state.likedSongs[songId]);
  const likeSong = useLikedSongs(state => state.likeSong)
  const unlikeSong = useLikedSongs(state => state.unlikeSong)


  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchLikeData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .match({user_id: user.id, song_id: songId})

      if (data && !error) {
        likeSong(songId);
      }
    };

    fetchLikeData();
  }, [user?.id, supabaseClient, songId, likeSong]);

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

      unlikeSong(songId);
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: user.id,
        song_id: songId,
      });

      if (error) {
        return toast.error("Something went wrong...");
      }

      likeSong(songId);
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
