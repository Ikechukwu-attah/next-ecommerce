"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/371829/pexels-photo-371829.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },

  {
    id: 3,
    url: "https://images.pexels.com/photos/1595243/pexels-photo-1595243.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },

  {
    id: 4,
    url: "https://images.pexels.com/photos/1178337/pexels-photo-1178337.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

const ProductImages = () => {
  const [imageList, setImageList] = useState(0);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={images[imageList].url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex gap-8 justify-between mt-10 ">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative w-1/4 h-32 gap-4 mt-8 cursor-pointer ${
              imageList === index ? "border-2 border-yellow-600 rounded-md" : ""
            }`}
            onClick={() => setImageList(index)}
          >
            <Image
              src={image.url}
              alt=""
              fill
              sizes="30vw"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
      ProductImages
      <h1>hello james</h1>
    </div>
  );
};

export default ProductImages;
