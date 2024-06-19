"use client";

import { slides } from "@/dummyData/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map(({ id, title, img, description, url, bg }, index) => (
          <div
            key={id}
            className={`w-screen h-full flex flex-col xl:flex-row ${
              current === index ? bg : ""
            }`}
          >
            {/* Text container */}
            <div className="h-1/2 xl:h-full xl:w-1/2 flex flex-col items-center justify-center gap-8 2xl:gap-12">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold text-center">
                {title}
              </h1>
              <Link href={url}>
                <button className="rounded-md bg-black text-white py-3 px-4">
                  Shop Now
                </button>
              </Link>
            </div>
            {/* Image container */}
            <div className="h-1/2 xl:h-full xl:w-1/2 relative">
              <Image
                src={img}
                fill
                sizes="100%"
                alt=""
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-50" : ""
            }`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[16px] h-[16px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
