"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  // used router hook for navigation
  const router = useRouter();

  // handle Logout in the future
  const handleLogout = () => {
    // handle Logout in the future
  };
  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
     `,
        className
      )}
    >
      <div
        className="
        w-full
        mb-4
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
                hidden
                md:flex
                gap-x-2
                items-center
            "
        >
          {/* Left button or back button*/}
          <button
            // this will redirect to back
            onClick={() => router.back()}
            className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-75
                    transition
                    "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          {/* right button or next button*/}
          <button
            // this will redirect to forward
            onClick={() => router.forward()}
            className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-75
                    transition
                    "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        {/* video start from 35:30 */}
      </div>
    </div>
  );
};

export default Header;
