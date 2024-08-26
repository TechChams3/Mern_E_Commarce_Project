import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Component/Header";
import { useGetProductsQuery } from "../Redux/api/productApiSlice.JS";
import Loader from "../Component/Loader";
import Message from "../Component/Message";
import Product from "./Product/Product";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Header />
      ) : isError ? (
        <Message varient="danger">{isError?.data || isError.error}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center ">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
