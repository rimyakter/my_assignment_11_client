import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa"; // ✅ Title icon

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

  // ✅ Fetch product by ID
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formData
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You Updated Data Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/all-products");
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed! try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="mt-6 mb-6 p-6 w-11/12 mx-auto">
      {/* Page Title */}
      <h1 className="text-xl md:text-3xl font-bold mb-3 text-center text-gray-900 flex items-center justify-center gap-3">
        <FaEdit className="text-primary" />
        Update Product
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Modify the product details below and save your changes
      </p>

      {/* Back Button */}
      <div className="flex justify-start mb-6">
        <button onClick={() => navigate(-1)} className="btn bg-gray-100">
          &larr; Back
        </button>
      </div>

      {/* Two Column Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full h-12"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full h-12"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="input input-bordered w-full h-12"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full h-12"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min={0}
              max={5}
              className="input input-bordered w-full h-12"
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
              className="input input-bordered w-full h-12"
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
              className="input input-bordered w-full h-12"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-[100px]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="btn bg-primary text-white w-full md:w-1/2 hover:cursor-pointer transition-all duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
