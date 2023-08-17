import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImageUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return null;

  const { data } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return data.publicUrl;
};

export default useLoadImageUrl
