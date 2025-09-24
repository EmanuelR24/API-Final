import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import { motion } from 'framer-motion';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const ProductForm = ({ product, onSave, authConfig }) => {  
  const [formData, setFormData] = useState(product || { nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });  

  useEffect(() => {  
    if (product) setFormData(product);  
  }, [product]);  

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      if (product?._id) {  
        await axios.put(`${API_URL}/api/products/${product._id}`, formData, authConfig);  
      } else {  
        await axios.post(`${API_URL}/api/products`, formData, authConfig);  
      }  
      onSave();  
    } catch (err) {  
      console.error('Error en producto:', err);  
    }  
  };  

  return (  
    <motion.form   
      onSubmit={handleSubmit}   
      initial={{ scale: 0.9 }}   
      animate={{ scale: 1 }}   
      transition={{ duration: 0.3 }} /* Animación suave */  
    >  
      <div className="form-group"><input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required /></div>  
      <div className="form-group"><input name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" /></div>  
      <div className="form-group"><input name="precio" type="number" value={formData.precio} onChange={handleChange} placeholder="Precio" required /></div>  
      <div className="form-group"><input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required /></div>  
      <div className="form-group"><input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Categoría" /></div>  
      <button type="submit">{product ? 'Actualizar' : 'Crear'}</button>  
    </motion.form>  
  );  
};  

export default ProductForm;  