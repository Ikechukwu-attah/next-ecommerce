"use client";

import { products } from "@wix/stores";
import React, { useEffect, useState } from "react";
import Add from "../Add/add";

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  console.log("production options", productOptions);
  console.log("variant options", variants);

  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();
  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOption).every(
        ([key, value]) => variantChoices[key] === value
      );
    });

    setSelectedVariant(variant);
  }, [selectedOption, variants]);

  const handleSelectedOption = (optionType: string, choice: string) => {
    setSelectedOption((prev) => ({ ...prev, [optionType]: choice }));
  };

  console.log(selectedOption);
  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;

      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock.quantity > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap4" key={option.name}>
          <h4 className="font-medium mb-3 ">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3" key={option.name}>
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOption,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOption[option.name!] === choice.description;
              const clickHandler = disabled
                ? undefined
                : () => handleSelectedOption(option.name!, choice.description!);

              return option.name === "Color" ? (
                <li
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300  relative "
                  style={{
                    backgroundColor: choice.description,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
                  )}

                  {disabled && (
                    <div className="absolute w-10 h-[2px] rotate-45 bg-red-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
                  )}
                </li>
              ) : (
                <li
                  className="ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#FBCFE8"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}

            {/* <ul className="flex items-center gap-3">
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
              <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
            </li>

            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
              <div className="absolute w-10 h-[2px] rotate-45 bg-red-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
            </li>
          </ul> */}
          </ul>
        </div>
      ))}

      <Add
        productId={productId!}
        variantId={selectedVariant?._id || "00000000-000000-000000-00000000000"}
        stockQuantity={selectedVariant?.stock?.quantity! || 0}
      />

      {/* <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer">
          Small
        </li>

        <li className="ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>

        <li className="ring-1 ring-pink-200 bg-pink-200  text-white rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li>
      </ul> */}
    </div>
  );
};

export default CustomizeProducts;
