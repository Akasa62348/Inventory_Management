import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SalesPage.css";

const SaleForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saleId, setSaleId] = useState(null); // For invoice link

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch {
        toast.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...selectedProducts];
    if (field === "productId") {
      const product = products.find((p) => p._id === value);
      updatedProducts[index] = {
        productId: value,
        name: product?.name || "",
        price: product?.price || 0,
        quantity: 1,
        total: product?.price || 0,
      };
    } else if (field === "quantity") {
      const product = products.find((p) => p._id === updatedProducts[index].productId);
      updatedProducts[index].quantity = Number(value);
      updatedProducts[index].total = product ? product.price * updatedProducts[index].quantity : 0;
    }
    setSelectedProducts(updatedProducts);
  };

  const addProductField = () => setSelectedProducts([...selectedProducts, { productId: "", name: "", price: 0, quantity: 1, total: 0 }]);
  const removeProductField = (index) => setSelectedProducts(selectedProducts.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return toast.error("All customer details are required.");
    if (!selectedProducts.length) return toast.error("Please select at least one product.");

    try {
      const { data } = await axios.post("/sales", {
        customerName,
        phone,
        address,
        products: selectedProducts.map(({ productId, quantity }) => ({ productId, quantity })),
      });

      toast.success("Sale recorded successfully.");
      setSaleId(data.sale._id); // Set sale ID for invoice link
      setCustomerName("");
      setPhone("");
      setAddress("");
      setSelectedProducts([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record sale.");
    }
  };

  const grandTotal = selectedProducts.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="sales-container">
      <h2>New Sale</h2>
      <form onSubmit={handleSubmit} className="sale-form">
        <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="input-field" />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input-field" />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="input-field" />

        {selectedProducts.map((product, index) => (
          <div key={index} className="product-selection">
            <select value={product.productId} onChange={(e) => handleProductChange(index, "productId", e.target.value)} required>
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name} (₹{p.price})</option>
              ))}
            </select>
            <input type="number" min="1" value={product.quantity} onChange={(e) => handleProductChange(index, "quantity", e.target.value)} className="quantity-input" required />
            <span>₹{product.total.toFixed(2)}</span>
            <button type="button" onClick={() => removeProductField(index)} className="remove-btn">Remove</button>
          </div>
        ))}

        <button type="button" onClick={addProductField} className="add-product-btn">Add Product</button>
        <div className="total-amount"><strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong></div>
        <button type="submit" className="submit-btn">Submit Sale</button>
      </form>

      {saleId && (
        <div className="invoice-link">
          <a href={`/invoice/sale/${saleId}`} target="_blank" rel="noopener noreferrer">Generate Invoice</a>
        </div>
      )}
    </div>
  );
};

export default SaleForm;
