import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';
import { getOrders, cancelOrder, createOrder, getProducts } from '../services/api';
import Navbar from '../components/Navbar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // Agregado para mejor UX
  const [error, setError] = useState(null); // Agregado para errores
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersRes, productsRes] = await Promise.all([getOrders(), getProducts()]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError('Error al cargar datos');
        navigate('/login'); // Redirige si es error de auth, o maneja según err
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // Ejecuta solo al montar

  const handleCreate = async (data) => {
    try {
      await createOrder(data);
      setShowForm(false);
      const res = await getOrders(); // Re-fetch para actualizar lista
      setOrders(res.data);
    } catch (err) {
      alert('Error: Stock insuficiente o otro problema');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      const res = await getOrders(); // Re-fetch para actualizar
      setOrders(res.data);
    } catch (err) {
      alert('Error al cancelar el pedido');
    }
  };

  const handleView = (id) => navigate(`/orders/${id}`);

  if (loading) return <p className="loading-text">Cargando pedidos...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Pedidos</h1>
      <button onClick={() => setShowForm(true)} className="button-primary">Nuevo Pedido</button>
      {showForm && <OrderForm products={products} onSubmit={handleCreate} />}
      <OrderTable orders={orders} onView={handleView} onCancel={handleCancel} />
    </div>
  );
};

export default Orders;