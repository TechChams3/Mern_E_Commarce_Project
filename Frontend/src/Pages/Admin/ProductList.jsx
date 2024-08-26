import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadProducImageMutation } from "../../Redux/api/productApiSlice.JS";
import { useCreateProductMutation } from "../../Redux/api/productApiSlice.JS";
import { useFetchCategoryQuery } from "../../Redux/api/categoryapiSlice.js";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
const ProductList = () => {
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [brand, setbrand] = useState("");
  const [stock, setstock] = useState(0);
  const [imageUrl, setimageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProducImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categorys } = useFetchCategoryQuery();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("CountInstock", stock);
      const { data } = await createProduct(productData);
      if (data.error) {
        console.log(data.error);
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandeler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setimage(res.image);
      setimageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-conter">
              <img
                src={imageUrl}
                alt="Product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="md-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/"
                onChange={uploadFileHandeler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="text"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>{" "}
            <br />
            <textarea
              type="text"
              className="p-2 md-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white  "
                  value={stock}
                  onChange={(e) => setstock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 md-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setcategory(e.target.value)}
                >
                  {categorys?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handelSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
