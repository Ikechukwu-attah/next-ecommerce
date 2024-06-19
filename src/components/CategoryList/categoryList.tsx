import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="px-4 scrollbar-custom overflow-x-scroll ">
      <div className="flex gap-4 md:gap-8">
        {Array.from({ length: 8 }, (_, index) => (
          <Link
            href={"/list?cat=test"}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={index}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src="https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fill
                sizes="100%"
                alt=""
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">
              Category name
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
