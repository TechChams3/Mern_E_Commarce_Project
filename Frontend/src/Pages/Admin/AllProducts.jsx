import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice.JS";
import AdminMenu from "./AdminMenu";
import Loader from "../../Component/Loader";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error loading product</div>;
  }
  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Product ({products.length})
          </div>
          <div className="flex flex-wrap justify-around items-center">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-around">
                  <div className="flex justify-between">
                    <h5 className="text-xl font-semibold mb-2">
                      {product?.name}
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {moment(product.creatAt).format("MMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 xl:[30rem] md:w-[20rem] sm:w-[10rem] text-sm md-4">
                    {product?.description?.substring(0, 160)} ...
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                    >
                      Update Product
                    </Link>
                    <p>${product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 ml-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
