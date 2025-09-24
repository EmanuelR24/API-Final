import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import Dashboard from './pages/Dashboard';  
import Login from './pages/Login';  
import Register from './pages/Register';  
import Products from './pages/Products';  
import Orders from './pages/Orders';  
import './App.css';  

const App = () => {  
  const [token, setToken] = useState(localStorage.getItem('token'));  

  const handleLogin = (newToken) => setToken(newToken);  

  const handleLogout = () => {  
    localStorage.removeItem('token');  
    setToken(null);  
  };  

  const authConfig = { headers: { Authorization: `Bearer ${token}` } };  

  return (  
    <Router>  
      <Routes>  
        <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard/products" />} />  
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard/products" />} />  
        <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}>  
          <Route path="products" element={<Products authConfig={authConfig} />} />  
          <Route path="orders" element={<Orders authConfig={authConfig} token={token} />} />  
        </Route>  
        <Route path="*" element={<Navigate to={token ? "/dashboard/products" : "/login"} />} />  
      </Routes>  
    </Router>  
  );  
};  

export default App;  