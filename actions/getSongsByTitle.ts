// imported song types from type
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./getSongs";

// getSongs function declaration
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // created the server component for subabase client
  const supabase = createServerComponentClient({
    // passes the cookies
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  // after that fetched our songs
  const { data, error } = await supabase
    // select from songs
    .from("songs")
    // in songs all songs
    .select("*")
    // in an newest first order
    .ilike('title', '%${title}%')
    .order("created_at", { ascending: false });

  // error handling
  if (error) {
    console.log(error);
  }

  // then return data as any type
  // or data is not present return empty array
  return (data as any) || [];
};

// export the getSongs function
export default getSongsByTitle;
