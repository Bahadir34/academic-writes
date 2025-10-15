import React from "react";
import { categoriesList } from "../../utils/categories";

const Categories = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold p-6 text-center md:text-left">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-9 gap-3 mx-auto px-6">
        {categoriesList.map((category) => (
          <div
            key={category.name}
            className="p-5  shadow-xl rounded-xl  flex flex-col gap-3 justify-center cursor-pointer"
          >
            <p className="text-xl font-bold text-zinc-400"> {category.name}</p>
            {category.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
