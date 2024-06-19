import CategoryList from "@/components/CategoryList/categoryList";
import ProductList from "@/components/ProductList/productList";
import Slider from "@/components/Slider/slider";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1>Feature Products</h1>
        <ProductList />
      </div>

      <div className="mt-24 ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-4">
          Categories
        </h1>
        <CategoryList />
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1>New Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
