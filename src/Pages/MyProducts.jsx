import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaUser,
  FaBuilding,
  FaTag,
  FaDollarSign,
  FaBoxes,
} from "react-icons/fa";

export default function MyProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/products?email=${user.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  return (
    <div className="p-6 w-11/12 mx-auto py-12">
      <Helmet>
        <title>Wholesale Avenue || My Products</title>
      </Helmet>

      {/* Page Title */}
      <div className=" text-center pb-12 ">
        <h1 className="text-xl md:text-3xl font-bold flex items-center justify-center gap-3 text-gray-900">
          <FaBoxOpen className="text-primary" />
          My Added Products
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-lg">
          Manage and view all the products you’ve added to your store.
        </p>
      </div>

      {/* Product Cards */}
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t added any products yet.
        </p>
      ) : (
        <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-sm shadow-sm p-4 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover rounded-sm"
              />
              <h2 className="text-xl font-semibold mt-3">{p.name}</h2>

              <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaUser className="text-primary" /> {user.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <FaBuilding className="text-primary" /> {p.brand}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <FaTag className="text-primary" /> {p.category}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <FaDollarSign className="text-primary" /> ${p.price}
              </p>

              <ReactStars
                count={5}
                value={Number(p.rating) || 0}
                size={24}
                edit={false}
                half={true}
                color2={"#d9500b"}
              />

              <p className="flex items-center gap-2 text-sm text-gray-700">
                <FaBoxes className="text-primary" /> Quantity: {p.mainQuantity}
              </p>

              <button
                onClick={() => navigate(`/update-product/${p._id}`)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-sm hover:cursor-pointer transition-all duration-200"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
