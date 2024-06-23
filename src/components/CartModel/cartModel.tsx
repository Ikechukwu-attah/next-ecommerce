"use client";

import Image from "next/image";
import React from "react";

const CartModel = () => {
  const cartItems = true;
  return (
    <div className=" w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white top-12 right-0 flex flex-col">
      {!cartItems ? (
        <div className="">Cart is empty</div>
      ) : (
        <>
          <h2 className="pb-4">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="flex gap-4" key={index}>
                <Image
                  src={
                    "https://images.pexels.com/photos/6178715/pexels-photo-6178715.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  }
                  alt=""
                  width={76}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* Top */}
                  {/* Title */}
                  <div className="flex justify-between items-center gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$78</div>
                  </div>
                  {/* Description */}
                  <div className="text-sm text-gray-500">Available </div>
                  {/* Bottom */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Quantity 2</span>
                    <span className="text-blue-500">Remove</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">$60</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Lorem ipsum dolor sit, amet consectetur .
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;
