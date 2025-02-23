import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAdd = () => navigate("/products/add");

  const handleEdit = (id) => navigate(`/products/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="product-list">
      <h2>Product Inventory</h2>
      <button className="add-btn" onClick={handleAdd}>➕ Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.supplier}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product._id)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No products available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
