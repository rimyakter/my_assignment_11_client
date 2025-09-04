import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ProductDetails() {
  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainQuantity, setMainQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setMainQuantity(res.data.minQty || 1);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  if (!product) return <p className="p-6">Product Not found</p>;

  // Quantity handlers
  const increase = () => setMainQuantity((q) => q + 1);
  const decrease = () => setMainQuantity((q) => Math.max(1, q - 1));

  // Buy handler
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
      await axios.post("http://localhost:3000/orders", {
        productId: product._id,
        quantity: mainQuantity,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        phone,
        address,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order Placed Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      document.getElementById("buy_modal").close();
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl w-full h-96 object-cover"
        />

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">Brand: {product.brand}</p>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="font-bold text-2xl mt-4">${product.price}</p>
          <p className="font-bold text-2xl mt-4">{product.mainQuantity}</p>
          <p className="text-sm text-gray-500 mt-2">
            Minimum Quantity: {product.minQty}
          </p>

          {/* Buy button */}
          <button
            onClick={() => document.getElementById("buy_modal").showModal()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-700"
          >
            Buy
          </button>
        </div>
      </div>

      {/* Buy Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Buy {product.name}</h3>

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
          <div className="modal-action">
            <button
              className="btn"
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
