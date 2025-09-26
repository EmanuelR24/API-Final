import React from 'react';

const OrderTable = ({ orders, onView, onCancel }) => (
  <table className="w-full bg-dark-bg rounded-xl overflow-hidden">
    <thead>
      <tr className="bg-purple-accent text-soft-white">
        <th className="p-2">ID</th>
        <th className="p-2">Total</th>
        <th className="p-2">Estado</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((o) => (
        <tr key={o._id} className="hover:bg-opacity-50 transition-all duration-300">
          <td className="p-2 text-soft-white">{o._id}</td>          <td className="p-2">{o.total}</td>
          <td className="p-2">{o.estado}</td>
          <td className="p-2">
            <button onClick={() => onView(o._id)} className="bg-purple-accent text-soft-white p-1 rounded-xl hover:bg-opacity-80 transition-all duration-300">Ver Detalle</button>
            {o.estado === 'activo' && <button onClick={() => onCancel(o._id)} className="bg-purple-accent text-soft-white p-1 rounded-xl hover:bg-opacity-80 transition-all duration-300 ml-2">Cancelar</button>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderTable;