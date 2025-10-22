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

  if (!product) return <p className="p-6">Product Not found</p>;

  const increase = () => setMainQuantity((q) => q + 1);
  const decrease = () => setMainQuantity((q) => Math.max(1, q - 1));

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
      // Save order in MongoDB
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: product._id,
        quantity: mainQuantity,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        phone,
        address,
      });

      // ✅ Extract order ID from backend response
      const orderId = res.data._id || res.data.orderId;

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order placed successfully",
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
    <div className="w-11/12 mx-auto py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-100  text-gray-700 px-4 py-2 rounded-sm shadow-sm hover:scale-105 transition-transform"
      >
        ← Back
      </button>

      {/* Layout */}
      <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="rounded-sm w-full h-96 object-cover shadow-sm hover:scale-105 transition-transform"
        />

        {/* Info */}
        <div className="col-span-2 bg-white rounded-sm shadow-sm p-6 space-y-4">
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

          {/* Buy button */}
          <button
            onClick={() => document.getElementById("buy_modal").showModal()}
            className="bg-primary text-white px-6 py-3 rounded-sm mt-4  shadow-sm font-semibold w-full transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Buy Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box rounded-2xl p-6 space-y-4 shadow-lg">
          <h3 className="font-bold text-2xl mb-4">Buy {product.name}</h3>

          {/* Quantity */}
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
              value={mainQuantity}
              onChange={(e) => setMainQuantity(Number(e.target.value))}
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
              Min: {product.minQty}
            </span>
          </div>

          {/* Prefilled fields */}
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

          {/* Extra fields */}
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

          {/* Actions */}
          <div className="modal-action flex justify-end gap-2">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("buy_modal").close()}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleBuy}>
              Confirm Buy
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
