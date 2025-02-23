// client/components/UpdateProduct.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data); // Pre-fills input values with product data
      } catch (err) {
        toast.error("Error fetching product details");
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, product);
      toast.success("Product updated successfully!");
      navigate("/products"); // Redirects to ProductList page
    } catch (err) {
      toast.error("Error updating product");
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="update-product">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-product-form">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          type="text"
          name="supplier"
          value={product.supplier}
          onChange={handleChange}
          placeholder="Supplier"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
