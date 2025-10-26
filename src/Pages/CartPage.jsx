import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { FiTrash2 } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

import { Helmet } from "@dr.pogodin/react-helmet";
import Swal from "sweetalert2";

import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/cart/${user.email}`)
      .then((res) => {
        // Only show items that are not paid
        const pendingItems = res.data.filter((item) => item.status !== "paid");
        setCartItems(pendingItems);
      })
      .catch((err) => console.error("Error loading cart:", err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleRemove = async (orderId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${orderId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== orderId));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You remove item from cart successfully",
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

  // ✅ Calculate total amount
  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  // ✅ Handle Proceed to Buy
  const handleProceedToBuy = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/cart-checkout`,
        {
          buyerName: user?.displayName,
          buyerEmail: user?.email,
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            total: item.total,
          })),
          totalAmount,
        }
      );

      const orderId = res.data._id || res.data.orderId;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Redirecting to payment...",
        showConfirmButton: false,
        timer: 1200,
      });

      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        "Something went wrong while processing payment",
        "error"
      );
    }
  };

  return (
    <div className="mb-12">
      <Helmet>
        <title>Wholesale Avenue || Cart Page</title>
      </Helmet>

      <h1 className="text-xl md:text-3xl font-bold mt-12 mb-3 text-gray-900 text-center gap-3 flex items-center justify-center">
        <FaShoppingCart className="text-primary" /> My Orders Page
      </h1>
      <p className="text-gray-600 text-sm md:text-lg text-center mb-12">
        View and manage all your orders
      </p>

      {/* 🔹 Order Summary */}
      {cartItems.length > 0 && (
        <div className="w-11/12 mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-10 transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Info */}
            <div className="flex items-center gap-4">
              <div className="bg-[#EB5E28]/10 p-3 rounded-full">
                <FaShoppingCart className="text-[#EB5E28] text-3xl" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  Order Summary
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  You have{" "}
                  <span className="font-semibold">{cartItems.length}</span>{" "}
                  {cartItems.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>

            {/* Right: Total & Button */}
            <div className="text-right space-y-2">
              <p className="text-gray-700 text-lg font-semibold">
                Total Amount:{" "}
                <span className="text-[#EB5E28] font-bold ml-2">
                  ${totalAmount.toFixed(2)}
                </span>
              </p>
              <button
                onClick={handleProceedToBuy}
                className="bg-[#EB5E28] text-white px-6 py-2 rounded-sm font-medium hover:bg-[#d94f1c] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-[#EB5E28]"></span>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">No orders found.</p>
      ) : (
        <div className="w-11/12 mx-auto bg-gray-100 p-6 rounded-sm mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item._id} className="card bg-white shadow-xl">
              <figure className="h-40 w-50 mx-auto bg-gray-100 mt-6 rounded-xl">
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
                {/* <p className="text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </p> */}
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
                    className="btn text-white bg-[#f53b57] rounded-2xl btn-sm gap-1 transition-all duration-300 hover:scale-105"
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
