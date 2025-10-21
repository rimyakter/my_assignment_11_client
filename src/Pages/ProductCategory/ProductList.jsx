import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import ReactStars from "react-stars";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaTags,
  FaBuilding,
  FaBoxes,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";

export default function ProductList() {
  const { id } = useParams(); // category id
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/products?category=${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Page Title and Subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
          Product Lists
        </h1>
        <p className="text-gray-600 text-sm md:text-lg">
          Browse all products available in this category
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // go back to previous page
        className="mb-6 bg-gray-100 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-sm"
      >
        ← Back
      </button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-sm">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-sm shadow-sm p-6 space-y-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-sm h-40 w-full object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>

            {/* <p className="text-sm text-gray-600 flex items-center gap-2">
              <FaTags className="text-[#eb5e28]" /> {product.category}
            </p> */}

            <p className="text-sm text-gray-600 flex items-center gap-2">
              <FaBuilding className="text-[#eb5e28]" /> {product.brand}
            </p>

            {/* <p className="text-sm text-gray-600 flex items-center gap-2">
              <FaBoxes className="text-[#eb5e28]" /> Total Quantity:{" "}
              {product.mainQuantity}
            </p> */}

            <p className="text-sm text-gray-500 flex items-center gap-2">
              <FaClipboardList className="text-[#eb5e28]" /> Min Quantity:{" "}
              {product.minQty}
            </p>

            <p className="font-bold text-lg mt-2 flex items-center gap-2">
              <FaDollarSign className="text-[#eb5e28]" /> {product.price}
            </p>

            {/* Rating with stars */}
            <ReactStars
              count={5}
              value={Number(product.rating) || 0}
              size={24}
              edit={false}
              half={true}
              color2={"#ffd700"} // gold stars
            />

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-[#eb5e28] text-white px-4 py-2 rounded-sm mt-3"
            >
              View Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
