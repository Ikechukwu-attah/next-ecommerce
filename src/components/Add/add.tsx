"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

const Add = ({
  productId,
  variantId,
  stockQuantity,
}: {
  productId: string;
  variantId: string;
  stockQuantity: number;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  // const stockQuantity: number = 8;
  const wixClient = useWixClient();

  const handleQuantity = (e: string) => {
    if (e === "increase" && stockQuantity > quantity) {
      setQuantity((prev) => prev + 1);
    }
    if (e === "decrease") {
      setQuantity((prev) => prev - 1);
    }
  };

  const addItem = async () => {
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: stockQuantity,
        },
      ],
    });
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
            {stockQuantity > 0 ? (
              <div>
                Only{" "}
                <span className="text-orange-500">
                  {stockQuantity} {stockQuantity > 1 ? "items" : "item"}{" "}
                </span>
                left!
                <br /> {"Don't"} miss it
              </div>
            ) : (
              <span>Out of stock</span>
            )}
          </div>
        </div>
        <button
          onClick={() => addItem()}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary  hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Add;
