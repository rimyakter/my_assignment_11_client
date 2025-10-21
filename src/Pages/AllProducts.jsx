import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaBoxes,
  FaThList,
  FaBuilding,
  FaTag,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";

export default function AllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const displayedProducts = showAvailableOnly
    ? products.filter((p) => p.minQty > 100)
    : products;

  return (
    <div className="p-6 w-11/12 mx-auto mb-6">
      <Helmet>
        <title>Wholesale Avenue || All Products</title>
      </Helmet>
      <h1 className="text-xl md:text-3xl font-bold mt-6 text-center gap-3 flex items-center justify-center">
        <FaThList className="text-primary" />
        All Products Page
      </h1>
      <p className="text-gray-600 text-sm md:text-lg mt-3 text-center mb-12">
        Explore our complete collection of products and find your favorites
      </p>

      <div className=" mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
        <button
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className="bg-[#EB5E28] text-white px-4 py-2 rounded-sm hover:bg-[#EB5E28]/90"
        >
          {showAvailableOnly ? "Show All Products" : "Show Available Products"}
        </button>

        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : displayedProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : view === "card" ? (
        <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-sm shadow-sm p-4 space-y-2"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover rounded-sm"
              />
              <h2 className="text-xl font-semibold mt-2">{p.name}</h2>

              <p className="text-gray-600 flex items-center gap-2">
                <FaBuilding className="text-primary" /> {p.brand}
              </p>
              <p className="text-gray-500 flex items-center gap-2">
                <FaTag className="text-primary" /> {p.category}
              </p>
              <p className="text-gray-500 flex items-center gap-2">
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

              <p className="text-gray-500 flex items-center gap-2">
                <FaBoxes className="text-primary" /> Total Quantity:{" "}
                {p.mainQuantity}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaClipboardList className="text-primary" /> Min. Selling Qty:{" "}
                {p.minQty}
              </p>

              <button
                onClick={() => navigate(`/update-product/${p._id}`)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-sm hover:cursor-pointer"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-100 p-6">
            <thead className="bg-gray-100">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Min Qty</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((p) => (
                <tr key={p._id} className="hover">
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.minQty}</td>
                  <td>{p.rating || 0}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/update-product/${p._id}`)}
                      className="btn btn-sm bg-primary text-white hover:cursor-pointer"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
