import React from "react";
import { Link } from "react-router";
import {
  FiMonitor,
  FiShoppingBag,
  FiBook,
  FiHome,
  FiGrid,
} from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi"; // sports icon

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: <FiMonitor className="text-6xl text-indigo-600" />,
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: <FiShoppingBag className="text-6xl text-pink-500" />,
  },
  {
    id: "books",
    name: "Books",
    icon: <FiBook className="text-6xl text-yellow-600" />,
  },
  {
    id: "sports",
    name: "Sports",
    icon: <GiSoccerBall className="text-6xl text-green-500" />,
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: <FiHome className="text-6xl text-orange-500" />,
  },
];

const CategoryList = () => {
  return (
    <div className="my-12">
      <h1 className="text-xl md:text-3xl text-center font-bold text-gray-900 flex items-center justify-center gap-3">
        <FiGrid className="text-primary text-xl md:text-3xl" />
        Products Categories
      </h1>
      <p className="text-center text-sm md:text-lg mb-2 mt-2 text-gray-600">
        All your daily needs under one roof
      </p>
      <p className="text-center text-sm text-gray-400 mb-12 mt-5">
        Click your favourite category to explore more
      </p>

      <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-5 gap-5 ">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/category/${cat.id}`}>
            <div className="bg-gray-100 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="mb-4">{cat.icon}</div>
              <h2 className="text-xl font-semibold text-center">{cat.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
