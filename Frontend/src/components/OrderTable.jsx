import React from 'react';

const OrderTable = ({ orders, onView, onCancel }) => (
  <table className="w-full dark-bg rounded-xl overflow-hidden">
    <thead>
      <tr className="purple-accent-bg soft-white-text">
        <th className="p-2">ID</th>
        <th className="p-2">Total</th>
        <th className="p-2">Estado</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((o) => (
        <tr key={o._id} className="hover-bg-opacity-50 transition-all">
          <td className="p-2 soft-white-text">{o._id}</td>
          <td className="p-2">{o.total}</td>
          <td className="p-2">{o.estado}</td>
          <td className="p-2">
            <button onClick={() => onView(o._id)} className="purple-accent-bg soft-white-text p-1 rounded-xl hover-opacity-80 transition-all">Ver Detalle</button>
            {o.estado === 'activo' && <button onClick={() => onCancel(o._id)} className="purple-accent-bg soft-white-text p-1 rounded-xl hover-opacity-80 transition-all ml-2">Cancelar</button>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderTable;