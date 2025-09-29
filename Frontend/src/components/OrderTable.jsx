import React from 'react';

const OrderTable = ({ orders, onView, onCancel }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Total</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((o) => (
        <tr key={o._id}>
          <td>{o._id}</td>
          <td>${o.total}</td>
          <td>{o.estado}</td>
          <td>
            <button onClick={() => onView(o._id)} className="button-secondary">Ver Detalle</button>
            {o.estado === 'activo' && <button onClick={() => onCancel(o._id)} className="button-secondary">Cancelar</button>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderTable;