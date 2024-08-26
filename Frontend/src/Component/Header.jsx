import React from "react";
import { useGetTopProductsQuery } from "../Redux/api/productApiSlice.JS";
import SmallProduct from "../Pages/Product/SmallProduct";
import Loader from "./Loader";
import ProductCarosol from "../Pages/Product/ProductCarosol";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <div className="flex justify-around">
      <div className="xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-cols-2">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>
      <ProductCarosol />
    </div>
  );
};

export default Header;
