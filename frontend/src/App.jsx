// client/App.jsx
import React from "react";
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
import InvoicePage from "./components/Invoice"; // Import the invoice page

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Root Redirect */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />

        {/* Public Routes */}
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/purchases" element={<PurchasePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/invoice/sale/:id" element={<InvoicePage type="sale" />} />
          <Route path="/invoice/purchase/:id" element={<InvoicePage type="purchase" />} />
        <Route path="/purchases/new" element={<PurchaseForm />} />
          
        </Route>
      </Routes>
    </>
  );
};

export default App;
