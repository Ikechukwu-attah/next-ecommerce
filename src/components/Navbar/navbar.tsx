import Link from "next/link";
import React from "react";
import Menu from "../Menu/menu";
import Image from "next/image";
import SearchBar from "../SearchBar/searchBar";
// import NavbarIcons from "./navbarIcons";
import { bigScreenSidNavbar, leftSidNavbar } from "@/dummyData/data";
import dynamic from "next/dynamic";

const NavbarIcons = dynamic(() => import("./navbarIcons"), {
  ssr: false,
});

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative ">
      {/* Mobile navbar */}
      <div className="h-full flex items-center justify-between md:hidden ">
        <div className="text-2xl tracking-wide">
          <Link href={"/"}>TonyAta</Link>
        </div>
        <Menu />
      </div>

      {/* Big Screen */}

      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        <div className="w-1/3 xl:w-1/2 flex items-center gap-4">
          <Link href={"/"} className="flex gap-3 items-center">
            <Image
              src="/logo.png"
              alt="menu"
              height={24}
              width={24}
              className="cursor-pointer"
            />
            <div className="text-2xl tracking-wide">TonyAta</div>
          </Link>
          <div className="hidden xl:flex justify-between gap-8">
            {bigScreenSidNavbar.map(({ id, title, url }) => (
              <Link href={url} key={id}>
                {title}
              </Link>
            ))}
          </div>
        </div>
        {/* right side of the navbar */}
        <div className="w-2/3 xl:w-1/2 flex justify-between items-center gap-8">
          <SearchBar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
