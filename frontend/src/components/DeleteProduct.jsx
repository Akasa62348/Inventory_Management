import React from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${productId}`);
      toast.success("Product deleted");
      onDelete(productId);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteProduct;
