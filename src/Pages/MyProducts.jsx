import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaBoxOpen, FaUser } from "react-icons/fa";

export default function MyProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axiosSecure
      .get(`/products?email=${user.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <Helmet>
        <title>Wholesale Avenue || My Products</title>
      </Helmet>

      {/* Page Title */}
      <div className="text-center pb-6">
        <h1 className="text-xl md:text-3xl font-bold flex items-center justify-center gap-3 text-gray-900">
          <FaBoxOpen className="text-primary" />
          My Added Products
        </h1>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t added any products yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-md ">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Brand</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.brand}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2">${p.price}</td>
                    <td className="px-4 py-2">{p.mainQuantity}</td>
                    <td className="px-4 py-2">
                      <ReactStars
                        count={5}
                        value={Number(p.rating) || 0}
                        size={20}
                        edit={false}
                        half={true}
                        color2={"#d9500b"}
                      />
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <FaUser className="text-primary" /> {user.email}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/update-product/${p._id}`)}
                        className="px-3 py-1 rounded bg-primary text-white text-xs hover:text-primary hover:bg-white hover:border transition-all duration-300"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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
        </>
      )}
    </div>
  );
}
