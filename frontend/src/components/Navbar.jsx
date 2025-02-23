import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>IMS</div>
      {isLoggedIn && (
        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
           <li><Link to="/sales/new">New Sale</Link></li>
             <li><Link to="/purchases/new">New Purchase</Link></li> 
          <li><Link to="/sales">Sales</Link></li>
          <li><Link to="/purchases">Purchases</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      )}
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/signup" className="auth-btn">Signup</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
