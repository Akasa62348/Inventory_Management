import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useParams } from "react-router-dom";
import "./ViewProduct.css";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => alert("Failed to load product"));
  }, [id]);

  return product ? (
    <div className="view-product">
      <h2>🔍 {product.name}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p><strong>Supplier:</strong> {product.supplier}</p>
    </div>
  ) : <p>Loading product details...</p>;
};

export default ViewProduct;
