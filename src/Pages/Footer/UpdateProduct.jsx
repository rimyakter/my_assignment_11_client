import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    brand: "",
    category: "",
    rating: 0,
    description: "",
    mainQuantity: 0,
    minimum_selling_quantity: 1,
  });

  // Fetch product by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) =>
        setFormData({
          image: res.data.image || "",
          name: res.data.name,
          brand: res.data.brand,
          category: res.data.category,
          rating: res.data.rating || 0,
          description: res.data.description || "",
          mainQuantity: res.data.mainQuantity || 0,
          minQty: res.data.minQty || 1,
          price: res.data.price,
        })
      )
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${id}`, formData);
      navigate("/all-products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Update Product</h1>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline mb-6">
        &larr; Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={5}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Main Quantity</label>
          <input
            type="number"
            name="mainQuantity"
            value={formData.mainQuantity}
            onChange={handleChange}
            min={0}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Minimum Selling Quantity
          </label>
          <input
            type="number"
            name="minQty"
            value={formData.minQty}
            onChange={handleChange}
            min={1}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn bg-[#eb5e28] text-white w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}
