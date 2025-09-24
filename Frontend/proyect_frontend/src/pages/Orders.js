import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import { motion } from 'framer-motion';  
import OrderForm from '../components/OrderForm';  
import OrderDetails from '../components/OrderDetails';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const Orders = ({ authConfig, token }) => {  
  const [orders, setOrders] = useState([]);  
  const [selectedOrder, setSelectedOrder] = useState(null);  

  useEffect(() => {  
    fetchOrders();  
  }, []);  

  const fetchOrders = async () => {  
    try {  
      const res = await axios.get(`${API_URL}/api/orders`, authConfig);  
      setOrders(res.data);  
    } catch (err) {  
      console.error('Fetch orders failed:', err);  
    }  
  };  

  const handleCancel = async (id) => {  
    try {  
      await axios.put(`${API_URL}/api/orders/${id}/cancel`, {}, authConfig);  
      fetchOrders();  
    } catch (err) {  
      console.error('Cancel failed:', err);  
    }  
  };  

  const handleSave = () => fetchOrders();  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>  
      <h1>Pedidos</h1>  
      <OrderForm onSave={handleSave} authConfig={authConfig} token={token} />  
      <table className="table">  
        <thead>  
          <tr>  
            <th>ID</th><th>Total</th><th>Estado</th><th>Acciones</th>  
          </tr>  
        </thead>  
        <tbody>  
          {orders.map(o => (  
            <motion.tr   
              key={o._id}   
              initial={{ y: 20 }}   
              animate={{ y: 0 }}   
              transition={{ duration: 0.3 }}  
            >  
              <td>{o._id}</td><td>{o.total}</td><td>{o.estado}</td>  
              <td>  
                <button onClick={() => setSelectedOrder(o._id)}>Ver Detalles</button>  
                {o.estado === 'activo' && <button onClick={() => handleCancel(o._id)}>Cancelar</button>}  
              </td>  
            </motion.tr>  
          ))}  
        </tbody>  
      </table>  
      {selectedOrder && <OrderDetails orderId={selectedOrder} authConfig={authConfig} />}  
    </motion.div>  
  );  
};  

export default Orders;  