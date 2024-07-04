import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "../Pagination/pagination";

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const product_per_page = 8;
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || product_per_page)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || product_per_page)
        : 0
    );

  console.log("searchParams", searchParams);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");
    console.log("sortType", sortType);

    if (sortType === "asc") {
      console.log("Applying ascending sort on:", sortBy);
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  console.log("kudos");
  const res = await productQuery.find();
  console.log("res", res);
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80 ">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              fill
              sizes="25vw"
              alt=""
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product?.media?.items && (
              <Image
                src={product?.media?.items[1]?.image?.url || "/product.png"}
                fill
                sizes="25vw"
                alt=""
                className="absolute object-cover rounded-md "
              />
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product?.priceData?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          {/* <div className="text-sm text-gray-500">My description</div> */}
          <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
            Add to cart
          </button>
        </Link>
      ))}

      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </div>
  );
};

export default ProductList;
