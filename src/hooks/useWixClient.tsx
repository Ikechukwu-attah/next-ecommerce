"use client";

import { wixClientContext } from "@/context/wixContext";
import { useContext } from "react";

export const useWixClient = () => {
  return useContext(wixClientContext);
};
