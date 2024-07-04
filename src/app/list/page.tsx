import Filter from "@/components/Filter/filter";
import ProductList from "@/components/ProductList/productList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  console.log("list searchParams", searchParams);
  const wixClient = await wixClientServer();
  const res = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% of on
            <br /> Selected Products{" "}
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">
            Buy now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">{res?.collection?.name}</h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryId={
            res?.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
      {/* <ProductList /> */}
    </div>
  );
};

export default ListPage;
