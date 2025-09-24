import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import { motion } from 'framer-motion';  
import ProductForm from '../components/ProductForm';  

const API_URL = process.env.REACT_APP_API_URL || 'https://api-gestion-stock.onrender.com';  

const Products = ({ authConfig }) => {  
  const [products, setProducts] = useState([]);  
  const [editingProduct, setEditingProduct] = useState(null);  

  useEffect(() => {  
    fetchProducts();  
  }, []);  

  const fetchProducts = async () => {  
    try {  
      const res = await axios.get(`${API_URL}/api/products`, authConfig);  
      setProducts(res.data);  
    } catch (err) {  
      console.error('Fetch products failed:', err);  
    }  
  };  

  const handleDelete = async (id) => {  
    try {  
      await axios.delete(`${API_URL}/api/products/${id}`, authConfig);  
      fetchProducts();  
    } catch (err) {  
      console.error('Delete failed:', err);  
    }  
  };  

  const handleSave = () => {  
    setEditingProduct(null);  
    fetchProducts();  
  };  

  return (  
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>  
      <h1>Productos</h1>  
      <ProductForm product={editingProduct} onSave={handleSave} authConfig={authConfig} />  
      <table className="table">  
        <thead>  
          <tr>  
            <th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th>  
          </tr>  
        </thead>  
        <tbody>  
          {products.map(p => (  
            <motion.tr   
              key={p._id}   
              initial={{ y: 20 }}   
              animate={{ y: 0 }}   
              transition={{ duration: 0.3 }}  
            >  
              <td>{p.nombre}</td><td>{p.descripcion}</td><td>{p.precio}</td><td>{p.stock}</td><td>{p.categoria}</td>  
              <td>  
                <button onClick={() => setEditingProduct(p)}>Editar</button>  
                <button onClick={() => handleDelete(p._id)}>Eliminar</button>  
              </td>  
            </motion.tr>  
          ))}  
        </tbody>  
      </table>  
    </motion.div>  
  );  
};  

export default Products;  