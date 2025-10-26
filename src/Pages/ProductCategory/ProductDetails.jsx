import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import {
  FaPlus,
  FaMinus,
  FaBuilding,
  FaBoxes,
  FaClipboardList,
  FaDollarSign,
  FaShoppingCart,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ProductDetails() {
  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainQuantity, setMainQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setMainQuantity(res.data.minQty || 1);
      })
      .catch((err) => console.error(err));
  }, [productId, axiosSecure]);

  if (!product) return <p className="p-6">Product not found</p>;

  const increase = () => setMainQuantity((q) => q + 1);
  // const decrease = () => setMainQuantity((q) => Math.max(1, q - 1));
  const decrease = () =>
    setMainQuantity((q) => Math.max(product.minQty, q - 1));

  const handleAddToCart = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: product._id,
        quantity: mainQuantity,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(`/cart/${user?.email}`);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add product to cart", "error");
    }
  };

  const handleBuy = async () => {
    document.getElementById("buy_modal").close();

    if (mainQuantity < product.minQty) {
      return Swal.fire(
        "Minimum Order Required",
        `You must order at least ${product.minQty}`,
        "warning"
      );
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: product._id,
        quantity: mainQuantity,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        phone,
        address,
      });

      const orderId = res.data._id || res.data.orderId;

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Order placed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(`/payment/${orderId}`);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-sm shadow-sm hover:scale-105 transition-transform flex items-center gap-2"
      >
        ← Back
      </button>

      {/* Layout */}
      <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Image vertically centered */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full h-96 object-cover shadow-lg hover:scale-105 transition-transform"
          />
        </div>

        {/* Product Info */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-gray-600 flex items-center gap-2">
            <FaBuilding className="text-primary" /> {product.brand}
          </p>

          <p className="text-gray-800">{product.description}</p>

          <p className="text-2xl font-bold flex items-center gap-2 text-primary">
            <FaDollarSign /> {product.price}
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <FaBoxes className="text-primary" /> Total Quantity:{" "}
            {product.mainQuantity}
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <FaClipboardList className="text-primary" /> Min Quantity:{" "}
            {product.minQty}
          </p>

          {/* Professional Quantity Selector */}
          <div className="flex items-center justify-start gap-4 mt-6">
            <button
              onClick={decrease}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 transition rounded-md"
            >
              <FaMinus />
            </button>

            <input
              type="number"
              value={mainQuantity}
              onChange={(e) =>
                setMainQuantity(
                  Math.max(product.minQty, Number(e.target.value))
                )
              }
              className="w-20 text-center border border-gray-300 rounded-md py-2 text-lg font-semibold outline-none"
              min={product.minQty}
            />

            <button
              onClick={increase}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 transition rounded-md"
            >
              <FaPlus />
            </button>

            <span className="text-sm text-gray-500">Min: {product.minQty}</span>
          </div>

          {/* Buttons with icons */}
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              onClick={() => document.getElementById("buy_modal").showModal()}
              className="bg-primary text-white px-6 py-3 rounded-lg shadow-md font-semibold w-full md:w-1/2 hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <FaDollarSign /> Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-white text-primary border border-primary px-6 py-3 rounded-lg shadow-md font-semibold w-full md:w-1/2 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box rounded-2xl p-6 space-y-4 shadow-lg">
          <h3 className="font-bold text-2xl mb-4">Buy {product.name}</h3>

          <div className="flex items-center justify-center gap-4 mb-6 bg-gray-100 p-2 rounded-md">
            <button
              onClick={decrease}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 text-gray-700 transition"
            >
              <FaMinus />
            </button>

            <input
              type="number"
              value={mainQuantity}
              onChange={(e) => setMainQuantity(Number(e.target.value))}
              className="w-20 text-center bg-gray-100 py-2 text-lg font-semibold outline-none"
              min={product.minQty}
            />

            <button
              onClick={increase}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 text-gray-700 transition"
            >
              <FaPlus />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Minimum order: {product.minQty}
          </p>

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
              Buy Now
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
