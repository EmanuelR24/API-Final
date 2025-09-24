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
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login onLogin={login} /> : <Navigate to="/products" />} />
          <Route path="/products" element={token ? <Products token={token} authConfig={authConfig} onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={token ? <Orders token={token} authConfig={authConfig} onLogout={logout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? "/products" : "/login"} />} />
        </Routes>
      </Router>
    </div>
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
    <form onSubmit={handleSubmit} className="login-form">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

function Products({ token, authConfig, onLogout }) {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
  const [editProduct, setEditProduct] = useState(null);

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
      const res = await axios.get(`${API_URL}/api/products`, authConfig);
      setProducts(res.data);
    } catch (err) {
      console.error('Create product failed:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editProduct) {
      try {
        await axios.put(`${API_URL}/api/products/${editProduct._id}`, editProduct, authConfig);
        setEditProduct(null);
        const res = await axios.get(`${API_URL}/api/products`, authConfig);
        setProducts(res.data);
      } catch (err) {
        console.error('Update product failed:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`, authConfig);
      const res = await axios.get(`${API_URL}/api/products`, authConfig);
      setProducts(res.data);
    } catch (err) {
      console.error('Delete product failed:', err);
    }
  };

  return (
    <div className="products-container">
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={editProduct ? handleUpdate : handleCreate}>
        <input value={editProduct ? editProduct.nombre : newProduct.nombre} onChange={(e) => {
          if (editProduct) setEditProduct({ ...editProduct, nombre: e.target.value });
          else setNewProduct({ ...newProduct, nombre: e.target.value });
        }} placeholder="Nombre" />
        <input value={editProduct ? editProduct.descripcion : newProduct.descripcion} onChange={(e) => {
          if (editProduct) setEditProduct({ ...editProduct, descripcion: e.target.value });
          else setNewProduct({ ...newProduct, descripcion: e.target.value });
        }} placeholder="Descripción" />
        <input value={editProduct ? editProduct.precio : newProduct.precio} onChange={(e) => {
          if (editProduct) setEditProduct({ ...editProduct, precio: e.target.value });
          else setNewProduct({ ...newProduct, precio: e.target.value });
        }} placeholder="Precio" />
        <input value={editProduct ? editProduct.stock : newProduct.stock} onChange={(e) => {
          if (editProduct) setEditProduct({ ...editProduct, stock: e.target.value });
          else setNewProduct({ ...newProduct, stock: e.target.value });
        }} placeholder="Stock" />
        <input value={editProduct ? editProduct.categoria : newProduct.categoria} onChange={(e) => {
          if (editProduct) setEditProduct({ ...editProduct, categoria: e.target.value });
          else setNewProduct({ ...newProduct, categoria: e.target.value });
        }} placeholder="Categoría" />
        <button type="submit">{editProduct ? 'Actualizar' : 'Crear Producto'}</button>
      </form>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.nombre} (Stock: {p.stock})
            <button onClick={() => setEditProduct(p)}>Editar</button>
            <button onClick={() => handleDelete(p._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
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
    <div className="orders-container">
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={handleCreateOrder}>
        <input value={newOrder.usuarioId} onChange={(e) => setNewOrder({ ...newOrder, usuarioId: e.target.value })} placeholder="Usuario ID" />
        <input value={newOrder.details[0].productoId} onChange={(e) => setNewOrder({ ...newOrder, details: [{ ...newOrder.details[0], productoId: e.target.value }] })} placeholder="Producto ID" />
        <input value={newOrder.details[0].cantidad} onChange={(e) => setNewOrder({ ...newOrder, details: [{ ...newOrder.details[0], cantidad: e.target.value }] })} placeholder="Cantidad" />
        <button type="submit">Crear Pedido</button>
      </form>
      <ul>
        {orders.map(o => (
          <li key={o._id}>
            Total: {o.total} - Estado: {o.estado}
            {o.estado === 'activo' && <button onClick={() => handleCancelOrder(o._id)}>Cancelar</button>}
            <ul>
              {o.details.map(d => (
                <li key={d._id}>Producto: {d.productoId}, Cantidad: {d.cantidad}, Subtotal: {d.subtotal}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;