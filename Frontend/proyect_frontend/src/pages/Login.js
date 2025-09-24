import React, { useState } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import { motion } from 'framer-motion';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const Login = ({ onLogin }) => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });  
      localStorage.setItem('token', res.data.token);  
      onLogin(res.data.token);  
      navigate('/dashboard/products');  
    } catch (err) {  
      console.error('Login fallido:', err.response?.data || err.message);  
    }  
  };  

  return (  
    <motion.form   
      onSubmit={handleSubmit}   
      initial={{ opacity: 0 }}   
      animate={{ opacity: 1 }}   
      transition={{ duration: 0.5 }}  
    >  
      <div className="form-group"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /></div>  
      <div className="form-group"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /></div>  
      <button type="submit">Login</button>  
    </motion.form>  
  );  
};  

export default Login;  