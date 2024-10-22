"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";

interface SidebarProps {
  children: React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  // imported a hook
  const pathname = usePathname();

  //  array of possible routes
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        // it every time active when not equal to search
        active: pathname !== "/search",
        herf: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        // it active when path is equal to start
        active: pathname === "/search",
        herf: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box children={undefined}>
            
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
