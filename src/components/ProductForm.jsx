"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FaGamepad,
  FaDollarSign,
  FaClipboardList,
  FaTags,
  FaInfoCircle,
  FaUpload,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "",
      image: null,
      price: "",
      description: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || formData.name.length < 3 || formData.name.length > 50) {
      toast.error("Product name must be between 3 and 50 characters.");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!formData.image && !product) {
      toast.error("Please upload an image.");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error("Price must be a positive number.");
      return;
    }

    if (!formData.description || formData.description.length < 5 || formData.description.length > 800) {
      toast.error("Description must be between 10 and 500 characters.");
      return;
    }

    setLoading(true);

    // Prepare form data for submission
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (product) {
        // Update existing product
        await axios.putForm(`http://localhost:3001/products/${product._id}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product updated successfully!");
      } else {
        // Add new product
        await axios.postForm("http://localhost:3001/products", dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added successfully!");
      }

      // Reset form and call the onSubmit callback
      setFormData({
        name: "",
        category: "",
        image: null,
        price: "",
        description: "",
      });
      onSubmit(); // Refresh the product list in the AdminDashboard
    } catch (error) {
      console.error(error);
      toast.error(`Error ${product ? "updating" : "adding"} product. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full p-8 bg-white rounded-lg shadow-lg border border-gray-100"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-extrabold text-center text-[#127AC1] mb-6">
        <FaGamepad className="inline-block text-red-500 mr-2" />
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Grid Layout for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FaTags className="text-[#127AC1] mr-2" />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1] focus:border-transparent transition-all text-black"
              required
            />
          </div>

          {/* Product Category */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FaClipboardList className="text-[#127AC1] mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1] focus:border-transparent transition-all text-black"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Video Games">Video Games</option>
              <option value="Gaming Gear">Gaming Gear</option>
              <option value="Subscriptions">Subscriptions</option>
            </select>
          </div>

          {/* Product Price */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FaDollarSign className="text-[#127AC1] mr-2" />
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1] focus:border-transparent transition-all text-black"
              required
            />
          </div>

          {/* Product Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center text-gray-700 font-medium">
              <FaUpload className="text-[#127AC1] mr-2" />
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1] focus:border-transparent transition-all text-black"
              required={!product} // Image is optional in edit mode
            />
          </div>
        </div>

        {/* Product Description (Full Width) */}
        <div className="space-y-2">
          <label className="flex items-center text-gray-700 font-medium">
            <FaInfoCircle className="text-[#127AC1] mr-2" />
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#127AC1] focus:border-transparent transition-all text-black"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          className="w-full py-3 bg-[#127AC1] text-white rounded-lg font-bold text-xl mt-6 hover:bg-[#ED3926] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (product ? "Updating..." : "Adding...") : (product ? "Update Product" : "Add Product")}
        </motion.button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 bg-gray-500 text-white rounded-lg font-bold text-xl mt-4 hover:bg-gray-600 transition-all"
        >
          <FaArrowLeft className="inline-block mr-2" />
          Cancel
        </button>
      </form>
    </motion.div>
  );
}