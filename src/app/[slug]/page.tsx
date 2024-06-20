import Add from "@/components/Add/add";
import CustomizeProducts from "@/components/CustomizeProducts/customizeProducts";
import ProductImages from "@/components/ProductImages/productImages";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative flex  flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        {/* Image */}

        <ProductImages />
      </div>

      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          illum, similique perspiciatis ab quia quibusdam. Iure amet cum ipsa ad
          expedita impedit ratione labore tenetur maxime dolorum, eligendi
          repellat? At.
        </p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h3 className="font-medium text-2xl">$49</h3>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100"></div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nisi qui
            labore cum nostrum provident sequi autem tempore dolorum ipsa
            aspernatur ullam, omnis expedita sapiente incidunt, nobis delectus
            pariatur ea?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
