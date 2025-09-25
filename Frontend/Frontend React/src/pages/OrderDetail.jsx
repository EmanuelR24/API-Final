import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/api';
import Navbar from '../components/Navbar';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(res => setOrder(res.data)).catch(() => navigate('/orders'));
  }, [id]);

  if (!order) return <div>Cargando...</div>;

  return (
    <div>
      <Navbar />
      <h1>Detalle Pedido {order._id}</h1>
      <p>Total: {order.total}</p>
      <p>Estado: {order.estado}</p>
      <table>
        <thead>
          <tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          {order.details.map(d => (
            <tr key={d._id}>
              <td>{d.productoId}</td>  {/* Ideal: fetch nombre producto */}
              <td>{d.cantidad}</td>
              <td>{d.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;