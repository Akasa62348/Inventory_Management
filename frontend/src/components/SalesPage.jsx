import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "./SalesPage.css";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 5;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await axios.get("/sales");
        setSales(data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
  }, []);

  const filteredSales = sales.filter(sale =>
    sale.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentSales = filteredSales.slice((currentPage - 1) * salesPerPage, currentPage * salesPerPage);
  const totalAmount = currentSales.reduce((acc, sale) => acc + sale.totalAmount, 0);

  return (
    <div className="sales-container">
      <h2>Sales Records</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Products</th>
            <th>Total Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {currentSales.length ? currentSales.map(sale => (
            <tr key={sale._id}>
              <td>{sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : "N/A"}</td>

              <td>{sale.products.map(product => `${product.name} x ${product.quantity}`).join(", ")}</td>
              <td>₹{sale.totalAmount.toFixed(2)}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" className="no-data">No sales found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentSales.length < salesPerPage}>Next</button>
      </div>

      <div className="total-amount">
        <strong>Total Amount (Current Page): ₹{totalAmount.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default SalesPage;
