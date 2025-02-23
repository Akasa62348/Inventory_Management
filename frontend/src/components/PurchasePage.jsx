import React, { useState, useEffect } from "react";
import axios from "../services/api";
import "./SalesPage.css";

const PurchasePage = () => {
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 5;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const { data } = await axios.get("/purchases");
        setPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  const filteredPurchases = purchases.filter(purchase =>
    purchase.products.some(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentPurchases = filteredPurchases.slice(
    (currentPage - 1) * purchasesPerPage,
    currentPage * purchasesPerPage
  );

  const totalAmount = currentPurchases.reduce((acc, purchase) => acc + purchase.totalAmount, 0);

  return (
    <div className="sales-container">
      <h2>Purchase Records</h2>
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
          {currentPurchases.length ? (
            currentPurchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>
                  {purchase.createdAt
                    ? new Date(purchase.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {purchase.products
                    .map((product) => `${product.name} x ${product.quantity}`)
                    .join(", ")}
                </td>
                <td>₹{purchase.totalAmount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPurchases.length < purchasesPerPage}
        >
          Next
        </button>
      </div>

      <div className="total-amount">
        <strong>Total Amount (Current Page): ₹{totalAmount.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default PurchasePage;
