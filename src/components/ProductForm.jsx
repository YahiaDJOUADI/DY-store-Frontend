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
  FaBox,
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
      stock: "",
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

    // Validation
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

    if (!formData.stock || formData.stock < 0) {
      toast.error("Stock must be a non-negative number.");
      return;
    }

    if (!formData.description || formData.description.length < 5 || formData.description.length > 800) {
      toast.error("Description must be between 5 and 800 characters.");
      return;
    }

    setLoading(true);

    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      if (product) {
        await axios.putForm(`http://localhost:3001/products/${product._id}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.postForm("http://localhost:3001/products", dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added successfully!");
      }

      setFormData({
        name: "",
        category: "",
        image: null,
        price: "",
        stock: "",
        description: "",
      });
      onSubmit();
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
      <h2 className="text-3xl font-extrabold text-center text-[#235789] mb-6">
        <FaGamepad className="inline-block text-[#ffcb05] mr-2" />
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-[#1d2731] font-medium">
              <FaTags className="text-[#235789] mr-2" />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-[#1d2731] font-medium">
              <FaClipboardList className="text-[#235789] mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Video Games">Video Games</option>
              <option value="Gaming Gear">Gaming Gear</option>
              <option value="Subscriptions">Subscriptions</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-[#1d2731] font-medium">
              <FaDollarSign className="text-[#235789] mr-2" />
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-[#1d2731] font-medium">
              <FaBox className="text-[#235789] mr-2" />
              Stock
            </label>
            <input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-[#1d2731] font-medium">
              <FaUpload className="text-[#235789] mr-2" />
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
              required={!product}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-[#1d2731] font-medium">
            <FaInfoCircle className="text-[#235789] mr-2" />
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235789] focus:border-transparent transition-all text-[#1d2731]"
            rows="4"
            required
          ></textarea>
        </div>

        <motion.button
          className="w-full py-3 bg-[#235789] text-white rounded-lg font-bold text-xl mt-6 hover:bg-[#0b3c5d] transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (product ? "Updating..." : "Adding...") : (product ? "Update Product" : "Add Product")}
        </motion.button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full py-3 bg-[#ED3926] text-white rounded-lg font-bold text-xl mt-4 hover:bg-[#c53022] transition-all"
        >
          <FaArrowLeft className="inline-block mr-2" />
          Cancel
        </button>
      </form>
    </motion.div>
  );
}