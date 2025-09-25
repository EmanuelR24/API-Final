import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const Navbar = () => (
  <nav>
    <Link to="/products">Productos</Link>
    <Link to="/orders">Pedidos</Link>
    <button onClick={logout}>Logout</button>
  </nav>
);

export default Navbar;