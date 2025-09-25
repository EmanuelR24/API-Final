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
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>Detalle de Pedido {order._id}</h1>
        <section>
          <p>Usuario ID: {order.usuarioId}</p>
          <p>Total: {order.total}</p>
          <p>Estado: {order.estado}</p>
          <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        </section>
        <section>
          <h2>Detalles</h2>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.details.map(d => (
                <tr key={d._id}>
                  <td>{products.find(p => p._id === d.productoId)?.nombre || d.productoId}</td>
                  <td>{d.cantidad}</td>
                  <td>{d.precioUnitario}</td>
                  <td>{d.subtotal}</td>
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