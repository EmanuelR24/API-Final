import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const Navbar = () => (
  <nav className="purple-accent-bg p-4">
    <ul className="flex space-x-6">
      <li><Link to="/dashboard" className="soft-white-text hover-text-light-gray transition-all">Dashboard</Link></li>
      <li><Link to="/products" className="soft-white-text hover-text-light-gray transition-all">Productos</Link></li>
      <li><Link to="/orders" className="soft-white-text hover-text-light-gray transition-all">Pedidos</Link></li>
      <li><button onClick={() => { logout(); window.location.href = '/login'; }} className="soft-white-text hover-text-light-gray transition-all">Logout</button></li>
    </ul>
  </nav>
);

export default Navbar;