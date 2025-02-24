// client/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SalesPage from "./components/SalesPage";
import PurchasePage from "./components/PurchasePage";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Dashboard from "./components/Dashboard";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SaleForm from "./components/SaleForm";
import PurchaseForm from "./components/PurchaseForm";
import InvoicePage from "./components/Invoice";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Root Redirect */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />

        {/* Public Routes */}
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" replace />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/invoice/sale/:id" element={<InvoicePage type="sale" />} />

          <Route path="/purchases" element={<PurchasePage />} />
          <Route path="/purchases/new" element={<PurchaseForm />} />
          <Route path="/invoice/purchase/:id" element={<InvoicePage type="purchase" />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
