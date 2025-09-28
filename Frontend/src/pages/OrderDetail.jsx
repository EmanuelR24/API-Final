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
        const orderData = orderRes.data;
        const productsData = productsRes.data;
        console.log('Order data:', orderData);
        console.log('Products data:', productsData);
        setOrder(orderData);
        setProducts(productsData);
      })
      .catch(() => navigate('/orders'));
  }, [id]);

  if (!order) return <p className="soft-white-text p-6">Cargando...</p>;

  return (
    <div className="min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="p-6">
        <h1 className="text-2xl soft-white-text">Detalle de Pedido {order._id}</h1>
        <section className="mt-4 space-y-2">
          <p className="soft-white-text">Usuario ID: {order.usuarioId}</p>
          <p className="soft-white-text">Total: {order.total}</p>
          <p className="soft-white-text">Estado: {order.estado}</p>
          <p className="soft-white-text">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        </section>
        <section className="mt-6">
          <h2 className="text-xl soft-white-text">Detalles</h2>
          <table className="w-full dark-bg rounded-xl overflow-hidden mt-2">
            <thead>
              <tr className="purple-accent-bg soft-white-text">
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.details && order.details.length > 0 ? (
                order.details.map(d => {
                  const productName = products.find(p => p._id === d.productoId)?.nombre || 'Producto no encontrado';
                  console.log('Detalle mapeado:', d, 'Producto encontrado:', productName);
                  return (
                    <tr key={d._id} className="hover-bg-opacity-50 transition-all">
                      <td className="p-2 soft-white-text">{productName}</td>
                      <td className="p-2 soft-white-text">{d.cantidad}</td>
                      <td className="p-2 soft-white-text">{d.precioUnitario}</td>
                      <td className="p-2 soft-white-text">{d.subtotal}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 soft-white-text text-center">No hay detalles disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default OrderDetail;