"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image: string;
  name: string;
  herf: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, herf }) => {
  const router = useRouter();

  // on click function
  const onClick = () => {
    // Add authentication before push
    // want to add/push only the authenticated user
    router.push(herf);
  };
  return (
    <button
      className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4
        "
    >
      <div
        className="
        relative
        min-h-[64px]
        min-w-[64px]
        "
      >
        <Image 
            className="object-cover" 
            fill 
            src={image} 
            alt="Liked Image" 
        />
      </div>
        <p className="font-medium truncate py-5">
            {name}
        </p>
      {/* video start from 52:10 */}
    </button>
  );
};

export default ListItem;
