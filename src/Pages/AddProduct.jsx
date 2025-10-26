import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "@dr.pogodin/react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa"; // ✅ only title icon kept

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    minQty: "",
    description: "",
    price: "",
    rating: "",
    image: "",
    mainQuantity: "",
  });

  const categories = ["Electronics", "Fashion", "Books", "Sports", "Furniture"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.minQty) > Number(formData.mainQuantity)) {
      alert("Minimum quantity cannot exceed main quantity!");
      return;
    }

    try {
      const payload = {
        ...formData,
        userEmail: user?.email || "anonymous",
      };

      const res = await axiosSecure.post(`/products`, payload);

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Added Product data Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/all-products");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed! Try Again!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed! Try Again!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className=" w-full">
      <Helmet>
        <title>Wholesale Avenue || Add Product</title>
      </Helmet>

      {/* Page Title */}
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-900 flex items-center justify-center gap-3">
        <FaBoxOpen className="text-[#eb5e28] text-3xl" />
        Add Products
      </h2>

      {/* Two-Column Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-gray-100 rounded-sm  mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
      >
        {/* Left Column */}
        <div className="space-y-4 flex flex-col justify-between">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand Name"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="mainQuantity"
            placeholder="Main Quantity"
            value={formData.mainQuantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            name="minQty"
            placeholder="Minimum Selling Quantity"
            value={formData.minQty}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col justify-between">
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            className="btn bg-[#eb5e28] flex gap-2 rounded-md text-white w-full md:w-1/3 hover:bg-[#eb5e28]/90 transition-all duration-300"
          >
            <FaPlusCircle className="text-white" /> Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
