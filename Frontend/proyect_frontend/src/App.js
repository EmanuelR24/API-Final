/**
 * Aplicación principal React.
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <LoginForm onLogin={login} /> : <Navigate to="/products" />} />
        <Route path="/products" element={token ? <ProductsList token={token} onLogout={logout} /> : <Navigate to="/login" />} />
        {/* Agrega rutas similares para orders, etc. */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

function ProductsList({ token, onLogout }) {
  const [products, setProducts] = useState([]);

  useState(() => {
    axios.get('http://localhost:3000/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <ul>{products.map(p => <li key={p._id}>{p.nombre}</li>)}</ul>
    </div>
  );
}

export default App;