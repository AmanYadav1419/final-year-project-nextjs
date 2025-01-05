"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";

import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const uploadModal = useUploadModal();

  const onClick = () => {
    // first check that if user is authenticated or not
    // if not authenticated open authentication modal
    if (!user) {
      return authModal.onOpen();
    }

    // TODO : Check for subscription

    // else open the upload modal
    return uploadModal.onOpen();
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
        {songs.map((item) => (
          <MediaItem 
            onClick={() => {}}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
