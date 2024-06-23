"use client";

import { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const stock: number = 8;

  const handleQuantity = (e: string) => {
    if (e === "increase" && stock > quantity) {
      setQuantity((prev) => prev + 1);
    }
    if (e === "decrease") {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("decrease")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button onClick={() => handleQuantity("increase")}>+</button>
          </div>
          <div className="text-sm">
            Only <span className="text-orange-500">6 items </span>left!
            <br /> {"Don't"} miss it
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary  hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Add;
