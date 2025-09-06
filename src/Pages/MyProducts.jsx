import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ReactStars from "react-stars";

export default function MyProducts() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products?email=${user.email}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <Helmet>
        <title>B2B Wholesale || My Products</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">My Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">You haven’t added any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover rounded-xl"
              />
              <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
              <p className="text-black-500">Posted By: {user.email}</p>
              <p className="text-gray-600 text-sm">Brand: {p.brand}</p>
              <p className="text-gray-500 text-sm">Category: {p.category}</p>
              <p className="text-gray-500 text-sm">Price: ${p.price}</p>

              <ReactStars
                count={5}
                value={Number(p.rating) || 0}
                size={24}
                edit={false}
                half={true}
                color2={"#ffd700"} // gold stars
              />
              <p className="text-gray-700 text-sm">
                Quantity: {p.mainQuantity}
              </p>
              <button
                onClick={() => navigate(`/update-product/${p._id}`)}
                className="mt-4 bg-[#eb5e28] text-white px-4 py-2 rounded-lg hover:bg-[#eb5f28e9] hover:cursor-pointer"
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
