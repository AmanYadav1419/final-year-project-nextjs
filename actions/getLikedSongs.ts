// imported song types from type
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// getSongs function declaration
const getLikedSongs = async (): Promise<Song[]> => {
  // created the server component for subabase client
  const supabase = createServerComponentClient({
    // passes the cookies
    cookies: cookies,
  });

  const {
    data: {
      session
    }
  } = await supabase.auth.getSession();

  // after that fetched our songs
  const { data, error } = await supabase
    // select from songs
    .from('liked_songs')
    // in songs all songs
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    // in an newest first order
    .order('created_at', { ascending: false });

  // error handling
  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  // then return data as any type
  // or data is not present return empty array
  return data.map((item) => ({
    ...item.songs
  }))
};

// export the getSongs function
export default getLikedSongs;
