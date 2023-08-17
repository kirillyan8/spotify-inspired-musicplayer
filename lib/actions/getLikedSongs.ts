import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data, error } = await supabase
      .from("liked_songs")
      .select("*, songs(*)")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error?.message);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map((item) => ({
      ...item.songs,
    }));
  } else {
    return [];
  }
};

export default getLikedSongs;
