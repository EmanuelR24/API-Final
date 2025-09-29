import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, getProducts } from '../services/api';
import Navbar from '../components/Navbar';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([getOrderById(id), getProducts()])
      .then(([orderRes, productsRes]) => {
        console.log('Datos del pedido crudos:', orderRes.data); 
      console.log('Lista de productos:', productsRes.data);
        setOrder(orderRes.data);
        setProducts(productsRes.data);
      })
      .catch(() => navigate('/orders'));
  }, [id]);

  if (!order) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">Detalle de Pedido {order._id}</h1>
        <section className="detail-section">
          <p>Usuario ID: {order.usuarioId}</p>
          <p>Total: {order.total}</p>
          <p>Estado: {order.estado}</p>
          <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        </section>
      </main>
    </div>
  );
};

export default OrderDetail;