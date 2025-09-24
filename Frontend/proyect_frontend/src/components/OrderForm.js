import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import {jwtDecode} from 'jwt-decode';  
import { motion } from 'framer-motion';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const OrderForm = ({ onSave, authConfig, token }) => {  
  const [products, setProducts] = useState([]);  
  const [details, setDetails] = useState([{ productId: '', cantidad: 1, precioUnitario: 0, subtotal: 0 }]);  
  const [total, setTotal] = useState(0);  
  const user = jwtDecode(token); // Obtiene usuarioId del token  

  useEffect(() => {  
    axios.get(`${API_URL}/api/products`, authConfig).then(res => setProducts(res.data));  
  }, [authConfig]);  

  const handleAddDetail = () => setDetails([...details, { productId: '', cantidad: 1, precioUnitario: 0, subtotal: 0 }]);  

  const handleDetailChange = (index, field, value) => {  
    const newDetails = [...details];  
    newDetails[index][field] = value;  
    if (field === 'productId') {  
      const prod = products.find(p => p._id === value);  
      if (prod) {  
        newDetails[index].precioUnitario = prod.precio;  
        newDetails[index].subtotal = prod.precio * newDetails[index].cantidad;  
      }  
    } else if (field === 'cantidad') {  
      newDetails[index].subtotal = newDetails[index].precioUnitario * value;  
    }  
    setDetails(newDetails);  
    setTotal(newDetails.reduce((sum, d) => sum + d.subtotal, 0));  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      await axios.post(`${API_URL}/api/orders`, { usuarioId: user.id, details, total }, authConfig);  
      onSave();  
    } catch (err) {  
      console.error('Crear pedido fallido:', err.response?.data || err.message); // Maneja error de stock insuficiente  
    }  
  };  

  return (  
    <motion.form onSubmit={handleSubmit} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>  
      <h3>Crear Pedido</h3>  
      {details.map((d, index) => (  
        <div key={index} className="form-group">  
          <select value={d.productId} onChange={(e) => handleDetailChange(index, 'productId', e.target.value)}>  
            <option value="">Selecciona Producto</option>  
            {products.map(p => <option key={p._id} value={p._id}>{p.nombre} (Stock: {p.stock})</option>)}  
          </select>  
          <input type="number" value={d.cantidad} onChange={(e) => handleDetailChange(index, 'cantidad', e.target.value)} min="1" />  
          <span>Subtotal: {d.subtotal}</span>  
        </div>  
      ))}  
      <button type="button" onClick={handleAddDetail}>Agregar Item</button>  
      <p>Total: {total}</p>  
      <button type="submit">Crear</button>  
    </motion.form>  
  );  
};  

export default OrderForm;  