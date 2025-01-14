"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaBox, FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import ProductForm from "../ProductForm";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const productsPerPage = 8;

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3001/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy, products]);

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#127AC1",
      cancelButtonColor: "#ED3926",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductFormOpen(true); 
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); 
    setIsProductFormOpen(true);
  };

  const handleFormSubmit = () => {
    setIsProductFormOpen(false); 
    fetchProducts(); 
  };

  const handleCancel = () => {
    setIsProductFormOpen(false);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaBox className="mr-2 text-[#127AC1]" /> Product Management
      </h2>

      {/* Filters and Add Product Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <FormControl className="w-full md:w-1/3">
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Video Games">Video Games</MenuItem>
            <MenuItem value="Gaming Gear">Gaming Gear</MenuItem>
            <MenuItem value="Subscriptions">Subscriptions</MenuItem>
          </Select>
        </FormControl>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/3 p-2 border rounded-md text-black py-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl className="w-full md:w-1/3">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{ backgroundColor: "#127AC1", color: "#fff" }}
          onClick={handleAddProduct}
          startIcon={<FaBox />}
          className="w-full md:w-auto"
        >
          Add Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative group flex flex-col h-[400px]" // Fixed height for the card
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={`http://localhost:3001/public/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-lg font-bold text-[#127AC1]">DZD{product.price}</p>
              <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center space-x-4 border-t border-gray-100">
              <Tooltip title="Edit">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex items-center px-3 py-1 bg-[#127AC1] text-white rounded-md hover:bg-[#0e5a9a] transition duration-200"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
              </Tooltip>
              <Tooltip title="Delete">
                <button
                  onClick={() => handleDeleteConfirmation(product._id)}
                  className="flex items-center px-3 py-1 bg-[#ED3926] text-white rounded-md hover:bg-[#c53022] transition duration-200"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ color: "#127AC1" }}
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * productsPerPage >= filteredProducts.length}
          style={{ color: "#127AC1" }}
        >
          Next
        </Button>
      </div>

      {/* ProductForm Modal Overlay */}
      {isProductFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <ProductForm
              product={selectedProduct} 
              onSubmit={handleFormSubmit} 
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;