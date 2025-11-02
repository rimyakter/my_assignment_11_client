import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaThList,
  FaTag,
  FaDollarSign,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";
import SearchBar from "../component/SearchBar";

export default function AllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/products`)
      .then((res) => {
        setProducts(res.data);
        const qtyMap = {};
        res.data.forEach((p) => (qtyMap[p._id] = p.minQty || 1));
        setQuantities(qtyMap);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const displayedProducts = showAvailableOnly
    ? products.filter((p) => p.mainQuantity > 400)
    : products;

  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : displayedProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToShow.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productsToShow.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id, minQty) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(minQty, prev[id] - 1),
    }));
  };

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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: selectedProduct._id,
        quantity,
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

  const handleAddToCart = async (product) => {
    const selectedQty = quantities[product._id] || product.minQty || 1;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        productId: product._id,
        quantity: selectedQty,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added to cart successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(`/cart/${user?.email}`);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      (product.productName || product.name || "")
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredProducts(filtered);
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

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
        <button
          onClick={() => {
            setShowAvailableOnly(!showAvailableOnly);
            setCurrentPage(1);
          }}
          className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 hover:cursor-pointer"
        >
          {showAvailableOnly ? "Show All Products" : "Show Available Products"}
        </button>

        <div className="flex">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : currentProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : view === "card" ? (
        <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {currentProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-sm shadow-sm p-4 space-y-1 transition "
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-36 w-full object-contain rounded-sm bg-gray-100 p-3 hover:bg-gray-100 transition"
              />

              <h2 className="text-lg font-semibold mt-2">{p.name}</h2>

              <p className="text-gray-400 flex items-center gap-2">
                <FaTag className="text-primary" /> {p.category}
              </p>
              <p className="text-gray-900 flex items-center gap-2 font-bold">
                <FaDollarSign className="text-primary" /> ${p.price}
              </p>

              {/* ✅ Professional Quantity Bar */}
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
                  <button
                    onClick={() => handleDecrease(p._id, p.minQty)}
                    className="px-3 py-1 hover:bg-gray-100 text-gray-700 transition"
                  >
                    <FaMinus size={10} />
                  </button>

                  <input
                    type="number"
                    value={quantities[p._id] || p.minQty}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [p._id]: Math.max(p.minQty, Number(e.target.value)),
                      }))
                    }
                    className="w-16 text-center border-x border-gray-200 bg-white py-1 text-sm font-semibold outline-none"
                    min={p.minQty}
                  />

                  <button
                    onClick={() => handleIncrease(p._id)}
                    className="px-3 py-2 hover:bg-gray-100 text-gray-700 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <p className="text-center text-xs text-gray-400">
                Min: {p.minQty}
              </p>

              {/* Buttons with Icons */}
              <div className="flex flex-col gap-3 mt-4 justify-between">
                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setQuantity(quantities[p._id] || p.minQty);
                    document.getElementById("buy_modal").showModal();
                  }}
                  className="bg-white text-primary border border-primary px-4 py-2 rounded-2xl hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
                >
                  <FaBolt /> Buy Now
                </button>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-white hover:text-primary hover:border hover:border-primary transition flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Buy Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box rounded-2xl p-6 space-y-4 shadow-lg">
          {selectedProduct && (
            <>
              <h3 className="font-bold text-2xl mb-4">
                Buy {selectedProduct.name}
              </h3>

              <div className="flex items-center justify-center mt-3">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.max(selectedProduct.minQty, q - 1)
                      )
                    }
                    className="px-3 py-2 hover:bg-gray-100 text-gray-700 transition"
                  >
                    <FaMinus size={12} />
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(selectedProduct.minQty, Number(e.target.value))
                      )
                    }
                    className="w-14 text-center border-x border-gray-200 bg-white py-2 text-sm font-semibold outline-none"
                    min={selectedProduct.minQty}
                  />

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 hover:bg-gray-100 text-gray-700 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500">
                Minimum order: {selectedProduct.minQty}
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
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
