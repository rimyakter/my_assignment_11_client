import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "@dr.pogodin/react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
      // include user email in request body
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
    <div className="max-w-3xl mx-auto p-6">
      <Helmet>
        <title>B2B Wholesale || Add Product</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
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
          required
        />

        <button type="submit" className="btn bg-[#eb5e28] text-white w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
