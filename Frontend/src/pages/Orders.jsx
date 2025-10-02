import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';
import { getOrders, cancelOrder, createOrder, getProducts } from '../services/api';
import Navbar from '../components/Navbar';

const Orders = () => {

  useEffect(() => {
  Promise.all([getOrderById(id), getProducts()])
    .then(([orderRes, productsRes]) => {
      console.log('Datos del pedido crudos:', orderRes.data);  // Debería mostrar { ..., details: [{productoId: {nombre: '...', ...}, cantidad: ..., ...}] }
      console.log('Detalles del pedido:', orderRes.data.details || 'Vacío');  // Verifica si details es array
      console.log('Lista de productos:', productsRes.data);
      setOrder(orderRes.data);
      setProducts(productsRes.data);
    })
    .catch(() => navigate('/orders'));
}, [id]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders().then(res => setOrders(res.data)).catch(() => navigate('/login'));
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleCreate = async (data) => {
    try {
      await createOrder(data);
      setShowForm(false);
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      alert('Error: Stock insuficiente o otro problema');
    }
  };

  const handleCancel = async (id) => {
    await cancelOrder(id);
    const res = await getOrders();
    setOrders(res.data);
  };

  const handleView = (id) => navigate(`/orders/${id}`);

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