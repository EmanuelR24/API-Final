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
        setOrder(orderRes.data);
        setProducts(productsRes.data);
      })
      .catch(() => navigate('/orders'));
  }, [id]);

  if (!order) return <p>Cargando...</p>;

return (
    <div className="min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="p-6">
        <h1 className="text-2xl text-soft-white">Detalle de Pedido {order._id}</h1>
        <section className="mt-4 space-y-2">
          <p className="text-soft-white">Usuario ID: {order.usuarioId}</p>
          <p className="text-soft-white">Total: {order.total}</p>
          <p className="text-soft-white">Estado: {order.estado}</p>
          <p className="text-soft-white">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        </section>
        <section className="mt-6">
          <h2 className="text-xl text-soft-white">Detalles</h2>
          <table className="w-full bg-dark-bg rounded-xl overflow-hidden mt-2">
            <thead>
              <tr className="bg-purple-accent text-soft-white">
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(order?.details || []).map(d => (
                <tr key={d._id} className="hover:bg-opacity-50 transition-all duration-300">
                  <td className="p-2 text-soft-white">{products.find(p => p._id === d.productoId)?.nombre || d.productoId}</td>
                  <td className="p-2 text-soft-white">{d.cantidad}</td>
                  <td className="p-2 text-soft-white">{d.precioUnitario}</td>
                  <td className="p-2 text-soft-white">{d.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default OrderDetail;