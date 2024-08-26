import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../Redux/features/cart/cartSlice";
import ProgressSteps from "../../Component/ProgressSteps";
const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paypalMethod, setPaypalMethod] = useState("PayPal");
  const [address, setAdderss] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandeler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paypalMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandeler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label className="block text-white mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAdderss(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">City</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Address"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">PostalCode</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Address"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Country</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter Address"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 ">Payment Method</label>
            <div className="mt-2">
              <lable className="mt-2">
                <input
                  type="radio"
                  className="form-radio text-pink-500  border rounded"
                  placeholder="Enter Address"
                  name="paymentMethod"
                  value="PayPle"
                  checked={paypalMethod === "Paypal"}
                  onChange={(e) => setPaypalMethod(e.target.value)}
                />
                <div className="ml-2">PayPal or Credit Card</div>
              </lable>
            </div>
          </div>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
