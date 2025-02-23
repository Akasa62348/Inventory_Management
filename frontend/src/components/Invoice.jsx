// InvoicePage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import "./Invoice.css";

const InvoicePage = ({ type }) => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const endpoint = type === "sale" ? `/sales/${id}` : `/purchases/${id}`;
        const { data } = await axios.get(endpoint);
        setInvoiceData(data);
      } catch {
        alert(`Failed to fetch ${type} details.`);
      }
    };
    fetchInvoice();
  }, [id, type]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`<html><head><title>Invoice</title></head><body>${printContent}</body></html>`);
    newWindow.document.close();
    newWindow.print();
  };

  if (!invoiceData) return <p>Loading invoice...</p>;

  return (
    <div className="invoice-container">
      <h2>{type === "sale" ? "Sales Invoice" : "Purchase Invoice"}</h2>
      <div ref={printRef} className="invoice-content">
        <p><strong>Date:</strong> {new Date(invoiceData.createdAt).toLocaleDateString()}</p>
        <p><strong>{type === "sale" ? "Customer" : "Supplier"}:</strong> {type === "sale" ? invoiceData.customerName : invoiceData.supplierName}</p>
        <p><strong>Phone:</strong> {invoiceData.phone}</p>
        <p><strong>Address:</strong> {invoiceData.address}</p>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.products.map((product, i) => (
              <tr key={i}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price}</td>
                <td>₹{product.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p><strong>Total Amount:</strong> ₹{invoiceData.totalAmount.toFixed(2)}</p>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default InvoicePage;
