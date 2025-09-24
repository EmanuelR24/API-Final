import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import { motion } from 'framer-motion';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const OrderDetails = ({ orderId, authConfig }) => {  
  const [details, setDetails] = useState(null);  

  useEffect(() => {  
    if (orderId) {  
      axios.get(`${API_URL}/api/orders/${orderId}`, authConfig).then(res => setDetails(res.data));  
    }  
  }, [orderId, authConfig]);  

  if (!details) return <p>Cargando...</p>;  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>  
      <h3>Detalles del Pedido {orderId}</h3>  
      <p>Total: {details.total}</p>  
      <p>Estado: {details.estado}</p>  
      <table className="table">  
        <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr></thead>  
        <tbody>  
          {details.detalles.map(d => (  
            <tr key={d._id}><td>{d.productoId}</td><td>{d.cantidad}</td><td>{d.precioUnitario}</td><td>{d.subtotal}</td></tr>  
          ))}  
        </tbody>  
      </table>  
    </motion.div>  
  );  
};  

export default OrderDetails;  