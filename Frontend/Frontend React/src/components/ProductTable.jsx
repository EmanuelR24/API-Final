import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table>
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
          <td>{p.nombre}</td>
          <td>{p.precio}</td>
          <td>{p.stock}</td>
          <td>
            <button onClick={() => onEdit(p._id)}>Editar</button>
            <button onClick={() => onDelete(p._id)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;