import React, { useState } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import { motion } from 'framer-motion';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const Register = () => {  
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', rol: 'vendedor' });  
  const navigate = useNavigate();  

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      await axios.post(`${API_URL}/api/auth/register`, formData);  
      navigate('/login');  
    } catch (err) {  
      console.error('Registro fallido:', err.response?.data || err.message);  
    }  
  };  

  return (  
    <motion.form   
      onSubmit={handleSubmit}   
      initial={{ opacity: 0 }}   
      animate={{ opacity: 1 }}   
      transition={{ duration: 0.5 }} /* Animación suave */  
    >  
      <div className="form-group"><input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required /></div>  
      <div className="form-group"><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required /></div>  
      <div className="form-group"><input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required /></div>  
      <div className="form-group">  
        <select name="rol" value={formData.rol} onChange={handleChange}>  
          <option value="admin">Admin</option>  
          <option value="vendedor">Vendedor</option>  
        </select>  
      </div>  
      <button type="submit">Registrar</button>  
    </motion.form>  
  );  
};  

export default Register;  