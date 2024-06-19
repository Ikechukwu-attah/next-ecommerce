import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.from({ length: 4 }, (_, index) => (
        <Link
          key={index}
          href="/test"
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80 ">
            <Image
              src="https://images.pexels.com/photos/2866796/pexels-photo-2866796.jpeg?auto=compress&cs=tinysrgb&w=600"
              fill
              sizes="25vw"
              alt=""
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />

            <Image
              src="https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              fill
              sizes="25vw"
              alt=""
              className="absolute object-cover rounded-md "
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Product Name</span>
            <span className="font-semibold">$89</span>
          </div>
          <div className="text-sm text-gray-500">My description</div>
          <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
            Add to cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
