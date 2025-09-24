import React from 'react';  
import { Link } from 'react-router-dom';  
import { motion } from 'framer-motion';  

const Sidebar = ({ onLogout }) => (  
  <motion.div   
    className="sidebar"   
    initial={{ x: -250 }}   
    animate={{ x: 0 }}   
    transition={{ duration: 0.5, ease: 'easeOut' }} /* Animación avanzada suave */  
  >  
    <h2>Dashboard</h2>  
    <ul style={{ listStyle: 'none', padding: 0 }}>  
      <li><Link to="/dashboard/products">Productos</Link></li>  
      <li><Link to="/dashboard/orders">Pedidos</Link></li>  
      <li><button onClick={onLogout}>Logout</button></li>  
    </ul>  
  </motion.div>  
);  

export default Sidebar;  