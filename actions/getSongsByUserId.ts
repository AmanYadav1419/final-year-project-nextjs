// imported song types from type
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// getSongs function declaration
const getSongsByUserId = async (): Promise<Song[]> => {
  // created the server component for subabase client
  const supabase = createServerComponentClient({
    // passes the cookies
    cookies: cookies,
  });

  const {
    data: sessionData,
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

// export the getSongs function
export default getSongsByUserId;