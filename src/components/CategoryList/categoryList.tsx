import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();
  console.log(cats.items);

  return (
    <div className="px-4 scrollbar-custom overflow-x-scroll ">
      <div className="flex gap-4 md:gap-8">
        {cats.items.map((cat) => (
          <Link
            href={`/list?cat=${cat?.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={cat._id}
          >
            <div className="relative bg-slate-100 w-full h-80">
              <Image
                src={cat?.media?.mainMedia?.image?.url || "/cat.png"}
                fill
                sizes="20vw"
                className="object-cover rounded-md"
                alt=""
              />
            </div>
            <h1 className="mt-4 font-light text-cl tracking-wide">
              {cat?.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
