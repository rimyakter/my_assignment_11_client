import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaBoxes,
  FaThList,
  FaBuilding,
  FaTag,
  FaDollarSign,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

export default function AllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // ✅ States for Buy Now feature
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  // ✅ Handle Buy logic (copied from ProductDetails)
  const handleBuy = async () => {
    document.getElementById("buy_modal").close();

    if (quantity < selectedProduct.minQty) {
      return Swal.fire(
        "Minimum Order Required",
        `You must order at least ${selectedProduct.minQty}`,
        "warning"
      );
    }

    try {
      // ✅ Save order and get response
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: selectedProduct._id,
        quantity,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        phone,
        address,
      });

      // ✅ Extract order ID from backend response
      const orderId = res.data._id || res.data.orderId;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You added items in the cart successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Navigate to payment page
      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto mb-6">
      <Helmet>
        <title>Wholesale Avenue || All Products</title>
      </Helmet>
      <h1 className="text-xl md:text-3xl font-bold mt-12 text-center gap-3 flex items-center justify-center">
        <FaThList className="text-primary" />
        All Products Page
      </h1>
      <p className="text-gray-600 text-sm md:text-lg mt-3 text-center mb-12">
        Explore our complete collection of products and find your favorites
      </p>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
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

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 justify-between">
                <button
                  onClick={() => navigate(`/update-product/${p._id}`)}
                  className="text-primary bg-white border border-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white hover:cursor-pointer"
                >
                  Update
                </button>

                {/* ✅ New Buy Now Button */}
                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setQuantity(p.minQty || 1);
                    document.getElementById("buy_modal").showModal();
                  }}
                  className="bg-white text-primary border border-primary px-4 py-2 rounded-sm hover:bg-primary hover:text-white hover:cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
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
                  <td className="flex gap-2">
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => navigate(`/update-product/${p._id}`)}
                        className="btn btn-sm bg-primary text-white hover:cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setQuantity(p.minQty || 1);
                          document.getElementById("buy_modal").showModal();
                        }}
                        className="btn btn-sm bg-primary text-white hover:cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Shared Buy Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box rounded-2xl p-6 space-y-4 shadow-lg">
          {selectedProduct && (
            <>
              <h3 className="font-bold text-2xl mb-4">
                Buy {selectedProduct.name}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={decrease}
                  className="btn btn-outline btn-square"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input input-bordered w-20 text-center"
                />
                <button
                  type="button"
                  onClick={increase}
                  className="btn btn-outline btn-square"
                >
                  <FaPlus />
                </button>
                <span className="ml-3 text-sm text-gray-600">
                  Min: {selectedProduct.minQty}
                </span>
              </div>

              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full mb-2"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                placeholder="Phone"
                className="input input-bordered w-full mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full mb-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="modal-action flex justify-end gap-2">
                <button
                  className="btn btn-outline"
                  onClick={() => document.getElementById("buy_modal").close()}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleBuy}>
                  Add To Cart
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
