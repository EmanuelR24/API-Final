import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Navbar = () => {
  let navigate = useNavigate();
  return (
  <nav className="navbar">
    <ul className="nav-list">
      <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
      <li><Link to="/products" className="nav-link">Productos</Link></li>
      <li><Link to="/orders" className="nav-link">Pedidos</Link></li>
      <li>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="nav-link button-link"
        >
          Logout
        </button>
      </li>
    </ul>
  </nav>
);
}

export default Navbar;