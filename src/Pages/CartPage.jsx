import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ loading state
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true); // start loading
    axiosSecure
      .get(`/cart/${user.email}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error loading cart:", err))
      .finally(() => setLoading(false)); // stop loading
  }, [user, axiosSecure]);

  const handleRemove = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${orderId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== orderId));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You cancelled the order successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed! Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>B2B Wholesale || Cart Page</title>
      </Helmet>
      <h1 className="text-3xl font-bold my-6 text-[#eb5e28]">
        🛒 My Orders Page
      </h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-[#EB5E28]"></span>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl">
              <figure className="h-40">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.productName}</h2>
                <p className="text-sm text-gray-600">
                  Ordered by: {item.buyerName}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {item.buyerEmail}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">
                    Minimum Buying Quantity:
                  </span>{" "}
                  {item.minBuyQty}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Total:</span> ${item.total}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn text-white bg-[#f53b57] btn-sm gap-2"
                  >
                    <FiTrash2 /> Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
