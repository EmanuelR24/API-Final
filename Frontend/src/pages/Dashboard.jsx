import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProducts, getOrders } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalSales: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getProducts(), getOrders()])
      .then(([productsRes, ordersRes]) => {
        const products = productsRes.data;
        const orders = ordersRes.data;

        const lowStock = products.filter(p => p.stock < 10).length;
        const activeOrders = orders.filter(o => o.estado === 'activo');
        const totalSales = activeOrders.reduce((sum, o) => sum + o.total, 0);

        setStats({
          totalProducts: products.length,
          lowStockProducts: lowStock,
          totalOrders: orders.length,
          activeOrders: activeOrders.length,
          totalSales
        });
      })
      .catch(() => navigate('/login'));
  }, []);

  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="title">Dashboard</h1>
        <section className="dashboard-section">
          <h2 className="subtitle">Resumen General</h2>
          <div className="grid-container">
            <div className="card">
              <p>Total Productos</p>
              <h3>{stats.totalProducts}</h3>
            </div>
            <div className="card">
              <p>Productos Bajos en Stock</p>
              <h3>{stats.lowStockProducts}</h3>
            </div>
            <div className="card">
              <p>Total Pedidos</p>
              <h3>{stats.totalOrders}</h3>
            </div>
            <div className="card">
              <p>Pedidos Activos</p>
              <h3>{stats.activeOrders}</h3>
            </div>
            <div className="card">
              <p>Ventas Totales</p>
              <h3>{stats.totalSales}</h3>
            </div>
          </div>
        </section>
        <section>
          <h2>Usuarios</h2>
          {/* Aquí iría la lista de usuarios */}
        </section>
        <section>
          <h2>Productos</h2>
          {/* Aquí iría la lista de productos */}
        </section>
        <section>
          <h2>Pedidos</h2>
          {/* Aquí iría la lista de pedidos */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;