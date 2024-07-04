"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import CartModel from "../CartModel/cartModel";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const NavbarIcons: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const wixClient = useWixClient();
  const pathname = usePathname();

  const isLoggedIn = wixClient.auth.loggedIn();

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(pathname);

    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={"/profile.png"}
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md bg-white top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/login">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out..." : "Logout"}
          </div>
        </div>
      )}
      <Image
        src={"/notification.png"}
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image
          src={"/cart.png"}
          alt=""
          width={22}
          height={22}
          className="cursor-pointer relative"
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white flex items-center justify-center">
          2
        </div>
      </div>

      {isCartOpen && <CartModel />}
    </div>
  );
};

export default NavbarIcons;
