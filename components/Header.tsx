"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  // used router hook for navigation
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  // extract the info from useUser hook
  const { user } = useUser();

  // if any error occured login out
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    // TODO:Reset any playing songs in future
    router.refresh();

    // TODO:Completed:- create toast component in error message section
    if (error) {
      // show the error message in toastify format
      toast.error(error.message);
    }
    // else show logged out sucessfully
    else {
      toast.success("Logged out!");
    }
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
        justify-between
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

        <div className="flex md:hidden gap-x-2 items-center">
          {/* on mobile screen nice Home Button */}

          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>

          {/* on mobile screen nice Search Button */}
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* div for login and sign up */}
        <div
          className="
        flex
        justify-between
        items-center
        gap-x-4
        "
        >
          {/* checked the condition if user is logged in */}
          {user ? (
            <div className="flex gap-4 items-center">
              <Button
                // onclick handle / run logout function
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>

              <Button
                // onclick push to route account
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            // if user is not logged in show the login & signup button
            <>
              <div>
                {/* import the custom button */}
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-transparent
                    text-neutral-300
                    font-medium
                    "
                >
                  Sign Up
                </Button>
              </div>

              <div>
                {/* import the custom button */}
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-white
                    px-6
                    py-2
                    "
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
