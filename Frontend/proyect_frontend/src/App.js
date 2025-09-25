import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login onLogin={login} /> : <Navigate to="/products" />} />
        <Route path="/products" element={token ? <Products token={token} authConfig={authConfig} onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders token={token} authConfig={authConfig} onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/products" : "/login"} />} />
      </Routes>
    </Router>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

function Products({ token, authConfig, onLogout }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });

  useEffect(() => {
    axios.get(`${API_URL}/api/products`, authConfig)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Fetch products failed:', err));
  }, [authConfig]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/products`, newProduct, authConfig);
      setNewProduct({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
      // Refetch products
      const res = await axios.get(`${API_URL}/api/products`, authConfig);
      setProducts(res.data);
    } catch (err) {
      console.error('Create product failed:', err);
    }
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={handleCreate}>
        <input value={newProduct.nombre} onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} placeholder="Nombre" />
        <input value={newProduct.descripcion} onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })} placeholder="Descripción" />
        <input value={newProduct.precio} onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })} placeholder="Precio" />
        <input value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Stock" />
        <input value={newProduct.categoria} onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })} placeholder="Categoría" />
        <button type="submit">Crear Producto</button>
      </form>
      <ul>{products.map(p => <li key={p._id}>{p.nombre} (Stock: {p.stock})</li>)}</ul>
    </div>
  );
}

function Orders({ token, authConfig, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ usuarioId: '', details: [{ productoId: '', cantidad: '' }] });

  useEffect(() => {
    axios.get(`${API_URL}/api/orders`, authConfig)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Fetch orders failed:', err));
  }, [authConfig]);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/orders`, newOrder, authConfig);
      setNewOrder({ usuarioId: '', details: [{ productoId: '', cantidad: '' }] });
      const res = await axios.get(`${API_URL}/api/orders`, authConfig);
      setOrders(res.data);
    } catch (err) {
      console.error('Create order failed:', err);
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      await axios.put(`${API_URL}/api/orders/${id}/cancel`, {}, authConfig);
      const res = await axios.get(`${API_URL}/api/orders`, authConfig);
      setOrders(res.data);
    } catch (err) {
      console.error('Cancel order failed:', err);
    }
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={handleCreateOrder}>
        <input value={newOrder.usuarioId} onChange={(e) => setNewOrder({ ...newOrder, usuarioId: e.target.value })} placeholder="Usuario ID" />
        <input value={newOrder.details[0].productoId} onChange={(e) => setNewOrder({ ...newOrder, details: [{ ...newOrder.details[0], productoId: e.target.value }] })} placeholder="Producto ID" />
        <input value={newOrder.details[0].cantidad} onChange={(e) => setNewOrder({ ...newOrder, details: [{ ...newOrder.details[0], cantidad: e.target.value }] })} placeholder="Cantidad" />
        <button type="submit">Crear Pedido</button>
      </form>
      <ul>{orders.map(o => <li key={o._id}>{o.total} - {o.estado} <button onClick={() => handleCancelOrder(o._id)}>Cancelar</button></li>)}</ul>
    </div>
  );
}

export default App;