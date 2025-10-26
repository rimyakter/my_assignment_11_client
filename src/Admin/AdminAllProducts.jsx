import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaThList } from "react-icons/fa";
import SearchBar from "../component/SearchBar";

export default function AdminAllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : displayedProducts;

  const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
  const paginatedProducts = productsToShow.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/products/${productId}`);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete product", "error");
      }
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
    setCurrentPage(1);
  };

  return (
    <div className="w-full mx-auto">
      <Helmet>
        <title>Wholesale Avenue || All Products</title>
      </Helmet>

      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
        <FaThList className="text-primary" />
        All Products
      </h1>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex-1 max-w-md w-full">
          <SearchBar onSearch={handleSearch} />
        </div>

        <button
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary"
        >
          {showAvailableOnly ? "Show All Products" : "Show Available Products"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center ">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : productsToShow.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-md ">
          <table className="w-full table-auto border-collapse text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className=" px-4 py-2">Image</th>
                <th className=" px-4 py-2">Name</th>
                <th className=" px-4 py-2">Brand</th>
                <th className=" px-4 py-2">Category</th>
                <th className=" px-4 py-2">Price</th>
                <th className=" px-4 py-2">Min Qty</th>
                <th className=" px-4 py-2">Rating</th>
                <th className=" px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className=" px-4 py-2">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className=" px-4 py-2">{p.name}</td>
                  <td className=" px-4 py-2">{p.brand}</td>
                  <td className=" px-4 py-2">{p.category}</td>
                  <td className=" px-4 py-2">${p.price}</td>
                  <td className=" px-4 py-2">{p.minQty}</td>
                  <td className=" px-4 py-2">
                    <ReactStars
                      count={5}
                      value={Number(p.rating) || 0}
                      size={20}
                      edit={false}
                      half={true}
                      color2={"#d9500b"}
                    />
                  </td>
                  <td className=" px-4 py-5 flex gap-2">
                    <button
                      onClick={() => navigate(`/update-product/${p._id}`)}
                      className="px-3 py-1 rounded bg-primary text-white text-xs hover:text-primary hover:bg-white hover:border transition-all duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
