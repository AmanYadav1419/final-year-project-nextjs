"use Client";

import useGetSongById from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

const Player  = () => {
    const Player = usePlayer();
    const { song } = useGetSongById(Player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !Player.activeId) {
        return null;
    }

    return (
        <div
            className="
                fixed
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
            "
        >
            <PlayerContent 
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}

export default Player;