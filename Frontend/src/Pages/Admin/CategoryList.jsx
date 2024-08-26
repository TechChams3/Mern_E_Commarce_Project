import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../Redux/api/categoryapiSlice";
import CategoryFrom from "../../Component/CategoryFrom";
import Model from "../../Component/Model";
import AdminMenu from "./AdminMenu";
const CategoryList = () => {
  const { data: categories } = useFetchCategoryQuery();
  const [name, setname] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [updateName, setupdateName] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handelCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setname("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again");
    }
  };

  const handelUpdatecategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updateCategory: {
          name: updateName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setselectedCategory(null);
        setupdateName("");
        setmodalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDeletecategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        setselectedCategory(null);
        setmodalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Category deleteing failed. Try again");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryFrom
          value={name}
          setvalue={setname}
          handelsubmit={handelCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border-pink-500 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setselectedCategory(category);
                    setmodalVisible(true);
                    setupdateName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Model isOpen={modalVisible} onClose={() => setmodalVisible(false)}>
          <CategoryFrom
            value={updateName}
            setvalue={(value) => setupdateName(value)}
            handelsubmit={handelUpdatecategory}
            button="Update"
            handelDelete={handelDeletecategory}
          />
        </Model>
      </div>
    </div>
  );
};

export default CategoryList;
