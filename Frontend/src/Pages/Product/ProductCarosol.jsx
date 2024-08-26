import React from "react";
import { useGetTopProductsQuery } from "../../Redux/api/productApiSlice.JS";
import Message from "../../Component/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarosol = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="md-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message varient="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />
                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <p className="w-[25rem]">{description.substring(0, 170)}</p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[15 rem]">
                        <FaStore className="mr-2 text-white" /> Added: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15 rem]">
                        <FaStar className="mr-2 text-white" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center md-6  w-[10rem]">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center md-6  w-[10rem]">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {Math.round(quantity)}
                      </h1>
                      <h1 className="flex items-center md-6  w-[10rem]">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        {Math.round(countInStock)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarosol;
