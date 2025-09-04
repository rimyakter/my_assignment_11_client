import React from "react";
import { Link } from "react-router";
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    img: "/electronics.jpg",
  },
  { id: "fashion", name: "Fashion", img: "/fashion.jpg" },
  { id: "books", name: "Books", img: "/books.jpg" },
  { id: "sports", name: "Sports", img: "/sports.jpg" },
  { id: "furniture", name: "Furniture", img: "/furniture.jpg" },
];

const CategoryList = () => {
  return (
    <div>
      <h1 className="text-3xl text-center mt-10 font-bold">
        Categories Of Products
      </h1>
      <p className="text-center text-lg mb-2 mt-2">
        All Your Daily Needs under One Roof
      </p>
      <p className="text-center text-xs mb-10 mt-2">
        Click Your favourite category to Explore More
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/category/${cat.id}`}>
            <div className="bg-[#fdf0d5] rounded-2xl shadow-lg p-4 hover:scale-95 transition">
              <img
                src={cat.img}
                alt={cat.name}
                className="rounded-xl h-40 w-full object-cover"
              />
              <h2 className="text-xl font-semibold text-center mt-3">
                {cat.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
