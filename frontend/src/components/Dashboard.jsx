import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "../services/api";
import "./Dashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, purchasesRes] = await Promise.all([
          axios.get("/sales"),
          axios.get("/purchases")
        ]);
        setSales(salesRes.data);
        setPurchases(purchasesRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const salesTotal = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const purchaseTotal = purchases.reduce((acc, purchase) => acc + purchase.totalAmount, 0);

  const barData = {
    labels: ["Sales", "Purchases"],
    datasets: [{
      label: "Amount (₹)",
      data: [salesTotal, purchaseTotal],
      backgroundColor: ["#2ecc71", "#e74c3c"],
    }],
  };

  const pieData = {
    labels: ["Sales", "Purchases"],
    datasets: [{
      data: [salesTotal, purchaseTotal],
      backgroundColor: ["#2ecc71", "#e74c3c"],
    }],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard Analytics</h2>
      <div className="charts">
        <div className="chart">
          <h3>Bar Chart</h3>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h3>Pie Chart</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
