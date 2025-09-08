import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // filter toggle
  const [view, setView] = useState("card"); // view toggle (card / table)
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/products`, {})

      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // filtered products
  const displayedProducts = showAvailableOnly
    ? products.filter((p) => p.minQty > 100)
    : products;

  return (
    <div className="p-6">
      <Helmet>
        <title>B2B Wholesale || All Products</title>
      </Helmet>
      <h1 className="text-3xl font-bold my-6 text-center">All Products</h1>

      {/* Filters + View Toggle */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <button
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className="bg-[#EB5E28] text-white px-4 py-2 rounded-lg hover:bg-[#EB5E28]/90"
        >
          {showAvailableOnly ? "Show All Products" : "Show Available Products"}
        </button>

        {/* View Toggle Dropdown */}
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {/* No Products */}
      {displayedProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : view === "card" ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover rounded-xl"
              />
              <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
              <p className="text-gray-600">Brand: {p.brand}</p>
              <p className="text-gray-500">Category: {p.category}</p>
              <p className="text-gray-500">Price: ${p.price}</p>
              <ReactStars
                count={5}
                value={Number(p.rating) || 0}
                size={24}
                edit={false}
                half={true}
                color2={"#ffd700"} // gold stars
              />
              <p className="text-gray-500">Total Quantity: {p.mainQuantity}</p>
              <p className="text-gray-700">Min. Selling Qty: {p.minQty}</p>
              <button
                onClick={() => navigate(`/update-product/${p._id}`)}
                className="mt-4 bg-[#eb5e28] text-white px-4 py-2 rounded-lg hover:bg-[#eb5f28e9]"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Always Table View (scrollable on mobile)
        <div className="overflow-x-auto">
          <table className="table w-full border">
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
                      className="btn btn-sm bg-[#eb5e28] text-white hover:bg-[#eb5e28]/90"
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
