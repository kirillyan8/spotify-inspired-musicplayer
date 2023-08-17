import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "@/lib/actions/getSongs";

const getSongsBySearch = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    return await getSongs();
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .or(`title.ilike.%${title}%,author.ilike.%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error?.message);
    return [];
  }

  return data || [];
};

export default getSongsBySearch;
