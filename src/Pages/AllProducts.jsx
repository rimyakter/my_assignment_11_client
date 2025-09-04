import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
// https://i.ibb.co.com/b5msBCB8/Yoga-Mat.jpg

export default function AllProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-2xl shadow-md p-4">
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover rounded-xl"
            />
            <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
            <p className="text-gray-600">Brand: {p.brand}</p>
            <p className="text-gray-500">Category: {p.category}</p>
            <p className="text-gray-500">Price: ${p.price}</p>
            <p className="text-gray-500">Rating: {p.rating || 0}</p>
            <p className="text-gray-700">Quantity: {p.mainQuantity}</p>
            <button
              onClick={() => navigate(`/update-product/${p._id}`)}
              className="mt-4 bg-[#eb5e28] text-white px-4 py-2 rounded-lg hover:bg-[#eb5f28e9] hover:cursor-pointer"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
