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
        <section className="detail-section">
          <h2 className="subtitle">Detalles</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.details && order.details.length > 0 ? (
                order.details.map(d => {
                  const productName = products.find(p => p._id === d.productoId)?.nombre || 'Producto no encontrado';
                  console.log('Detalle procesado:', d, 'Nombre encontrado:', productName);
                  return (
                    <tr key={d._id}>
                      <td>{productName}</td>
                      <td>{d.cantidad}</td>
                      <td>{d.precioUnitario}</td>
                      <td>{d.subtotal}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No hay detalles disponibles</td>
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