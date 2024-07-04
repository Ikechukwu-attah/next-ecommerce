import Add from "@/components/Add/add";
import CustomizeProducts from "@/components/CustomizeProducts/customizeProducts";
import ProductImages from "@/components/ProductImages/productImages";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  console.log(params.slug);
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();
  console.log(products.items);
  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  console.log(product);
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex  flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        {/* Image */}

        <ProductImages items={product?.media?.items} />
      </div>

      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.description}</p>
        <div className="h-[2px] bg-gray-100 "></div>
        {/* <div> */}
        {product.priceData?.price === product.priceData?.discountedPrice ? (
          <h2 className="font-medium text-2xl ">${product.priceData?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.priceData?.price}
            </h3>

            <h2 className="font-medium text-2xl">
              ${product.priceData?.discountedPrice}
            </h2>
          </div>
        )}
        {/* </div> */}
        <div className="h-[2px] bg-gray-100"></div>
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product?._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product?._id!}
            variantId="00000000-000000-000000-000000000001"
            stockQuantity={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100"></div>
        {product.additionalInfoSections?.map((item, index) => (
          <div key={index} className="text-sm">
            <h4 className="font-medium mb-4">{item.title}</h4>
            <p>{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePage;
