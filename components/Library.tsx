"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const onClick = () => {
    // handle upload later,
    // which will use to upload the song
  };

  return (
    <div className="flex flex-col">
      <div
        className="
        flex
        items-center
        justify-between
        px-5
        pb-4
        "
      >
        {/* Playlist icon */}
        <div
          className="
                inline-flex
                items-center
                gap-x-2
            "
        >
          <TbPlaylist className="text-neutral-400" size={26} />
          <p
            className="
                    text-neutral-400
                    font-medium
                    text-md
                    "
          >
            Your Library
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={28}
          className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
        />
      </div>

      <div
        className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
        "
      >
        List of Songs!!
        
      </div>
    </div>
  );
};

export default Library;
