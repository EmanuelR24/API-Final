import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <header>
        <Navbar />
      </header>
      <main className="p-6">
        <h1 className="text-2xl text-soft-white">Dashboard</h1>
        <section className="mt-4 space-y-4">
          <h2 className="text-soft-white">Resumen General</h2>
          <ul className="grid grid-cols-2 gap-4">
            <li className="bg-dark-bg p-4 rounded-xl border border-light-gray transition-all duration-300 hover:bg-opacity-80">Total Productos: {stats.totalProducts}</li>
            <li className="bg-dark-bg p-4 rounded-xl border border-light-gray transition-all duration-300 hover:bg-opacity-80">Productos con Stock Bajo: {stats.lowStockProducts}</li>
            <li className="bg-dark-bg p-4 rounded-xl border border-light-gray transition-all duration-300 hover:bg-opacity-80">Total Pedidos: {stats.totalOrders}</li>
            <li className="bg-dark-bg p-4 rounded-xl border border-light-gray transition-all duration-300 hover:bg-opacity-80">Pedidos Activos: {stats.activeOrders}</li>
            <li className="bg-dark-bg p-4 rounded-xl border border-light-gray transition-all duration-300 hover:bg-opacity-80">Ventas Totales (Activas): {stats.totalSales}</li>
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="text-soft-white">Acciones Rápidas</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/products" className="text-purple-accent hover:text-light-gray transition-all duration-300">Gestionar Productos</a></li>
            <li><a href="/orders" className="text-purple-accent hover:text-light-gray transition-all duration-300">Gestionar Pedidos</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;