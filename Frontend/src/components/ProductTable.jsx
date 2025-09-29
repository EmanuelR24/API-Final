import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p._id}>
          <td>{p.nombre || 'N/A'}</td>
          <td>${p.precio || 0}</td>
          <td>{p.stock || 0}</td>
          <td>
            <button onClick={() => onEdit(p._id)} className="button-secondary">Editar</button>
            <button onClick={() => onDelete(p._id)} className="button-secondary">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;