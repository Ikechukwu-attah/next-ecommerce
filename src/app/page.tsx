// "use client";

import CategoryList from "@/components/CategoryList/categoryList";
import ProductList from "@/components/ProductList/productList";
import Slider from "@/components/Slider/slider";
import { wixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = useWixClient();

  // const getResponse = async () => {
  //   const response = await wixClient.products.queryProducts().find();
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getResponse();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();
  // const response = await wixClient.products.queryProducts().find();
  // console.log(response);

  console.log(process.env.FEATURED_PRODUCTS_CATEGORY_ID);
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1>Feature Products</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={40}
          />
        </Suspense>
      </div>

      <div className="mt-24 ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-4">
          Categories
        </h1>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1>New Products</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  );
};

export default HomePage;
