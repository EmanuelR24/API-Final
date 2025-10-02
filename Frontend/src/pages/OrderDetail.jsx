import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderById, getProducts, cancelOrder } from '../services/api';
import Navbar from '../components/Navbar';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState(null);

  // Cargar pedido y productos
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [orderRes, productsRes] = await Promise.all([getOrderById(id), getProducts()]);
      console.log("Pedido recibido del backend:", orderRes.data);
      console.log("Productos recibidos:", productsRes.data);
      setOrder(orderRes.data);
      setProducts(productsRes.data);
    } catch (e) {
      setError('No se pudo cargar el pedido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  // Cancelar pedido
  const onCancel = async () => {
    if (!window.confirm('¿Estás seguro de cancelar este pedido? Esta acción no se puede deshacer.')) return;
    setCancelling(true);
    try {
      await cancelOrder(id);
      await load();
    } catch (e) {
      alert('No se pudo cancelar el pedido');
    } finally {
      setCancelling(false);
    }
  };

  // Obtener nombre del producto por id (ahora productoId es objeto populado)
  const getProductName = (pidOrObj) => {
    if (typeof pidOrObj === 'object' && pidOrObj !== null && pidOrObj.nombre) return pidOrObj.nombre;
    return typeof pidOrObj === 'string' ? pidOrObj : 'Desconocido';
  };

  // Estadísticas
  const details = Array.isArray(order?.details) ? order.details : [];
  console.log("Detalles del pedido:", details);

  const totalAmount = details.reduce((sum, d) => sum + (d.subtotal || 0), 0);

  // Estado visual
  const getStatusConfig = (estado) => {
    const configs = {
      activo: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅', label: 'Activo' },
      cancelado: { color: 'bg-red-100 text-red-800 border-red-200', icon: '❌', label: 'Cancelado' }
    };
    return configs[estado] || { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '⏳', label: estado || 'Desconocido' };
  };
  const statusConfig = getStatusConfig(order?.estado);

  const [orderRes, productsRes] = await Promise.all([getOrderById(id), getProducts()]);
  console.log("Respuesta cruda del API:", orderRes.data);  // Debería mostrar details si existen
  console.log("Details después de setOrder:", orderRes.data.details);  // Debería ser array con objetos
  // Loading/error
  if (loading) return (
    <div className="loading-text">Cargando pedido...</div>
  );
  if (error) return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">😞</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar</h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <Link to="/orders" className="button-primary">Volver a Pedidos</Link>
    </div>
  );
  if (!order) return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Pedido no encontrado</h3>
      <p className="text-gray-600 mb-4">El pedido que buscas no existe o fue eliminado</p>
      <Link to="/orders" className="button-primary">Volver a Pedidos</Link>
    </div>
  );

  return (
    <div className="container">
      <Navbar />
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/orders" className="button-secondary" title="Volver a pedidos">←</Link>
            <div>
              <h1 className="title">Pedido #{order._id}</h1>
              <p className="subtitle">Detalles del pedido</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 ${statusConfig.color}`}>
              <span className="text-lg">{statusConfig.icon}</span>
              <span className="font-semibold">{statusConfig.label}</span>
            </div>
            {order.estado === 'activo' && (
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="button-secondary text-red-600"
              >
                {cancelling ? (
                  <>
                    <span className="loading-text">Cancelando...</span>
                  </>
                ) : (
                  <>
                    <span>❌</span> Cancelar
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Estadísticas del pedido */}
        <div className="grid-container">
          <div className="card">
            <p>Productos</p>
            <h3>{details.length}</h3>
          </div>
          <div className="card">
            <p>Total</p>
            <h3>${totalAmount}</h3>
          </div>
          <div className="card">
            <p>Usuario</p>
            <h3>{order.usuarioId}</h3>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="detail-section">
          <h2 className="subtitle">Productos del Pedido</h2>
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
              {details.length > 0 ? (
                details.map((d, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="font-medium">{getProductName(d.productoId)}</span>
                      <div className="text-gray-500 text-xs">ID: {typeof d.productoId === 'object' ? d.productoId._id : d.productoId}</div>
                    </td>
                    <td>{d.cantidad}</td>
                    <td>${d.precioUnitario}</td>
                    <td>${d.subtotal}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>No hay productos en este pedido.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}