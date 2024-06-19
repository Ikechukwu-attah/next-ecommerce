"use client";

import { leftSidNavbar } from "@/dummyData/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt="menu"
        height={28}
        width={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)]  flex flex-col justify-center items-center gap-4 text-xl z-10">
          {leftSidNavbar.map(({ id, title, url }) => (
            <Link href={url} key={id}>
              {title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
