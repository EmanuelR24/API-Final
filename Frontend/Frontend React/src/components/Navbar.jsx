import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const Navbar = () => (
  <nav className="bg-purple-accent p-4">
    <ul className="flex space-x-6">
      <li><Link to="/dashboard" className="text-soft-white hover:text-light-gray transition-all duration-300">Dashboard</Link></li>
      <li><Link to="/products" className="text-soft-white hover:text-light-gray transition-all duration-300">Productos</Link></li>
      <li><Link to="/orders" className="text-soft-white hover:text-light-gray transition-all duration-300">Pedidos</Link></li>
      <li><button onClick={() => { logout(); window.location.href = '/login'; }} className="text-soft-white hover:text-light-gray transition-all duration-300">Logout</button></li>
    </ul>
  </nav>
);

export default Navbar;