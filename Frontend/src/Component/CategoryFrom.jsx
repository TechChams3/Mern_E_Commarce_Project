import React from "react";

const CategoryFrom = ({
  value,
  setvalue,
  handelsubmit,
  button = "Submit",
  handelDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handelsubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            {button}
          </button>
          {handelDelete && (
            <button
              onClick={handelDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryFrom;
