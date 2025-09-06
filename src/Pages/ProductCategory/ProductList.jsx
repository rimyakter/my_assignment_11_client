import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function ProductList() {
  const { id } = useParams(); // category id
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products?category=${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // go back to previous page
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg p-4 space-y-2"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl h-40 w-full object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">
              Category Name: {product.category}
            </p>
            <p className="text-sm text-gray-600">Brand Name: {product.brand}</p>
            <p className="text-sm text-gray-600">
              Product Total Quantity: {product.mainQuantity}
            </p>
            <p className="text-sm text-gray-500">
              Minimum Quantity: {product.minQty}
            </p>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-bold text-lg mt-2">${product.price}</p>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600 ml-2">
                {product.rating || 0}
              </span>
            </div>

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-[#eb5e28] text-white px-4 py-2 rounded-lg mt-3"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
