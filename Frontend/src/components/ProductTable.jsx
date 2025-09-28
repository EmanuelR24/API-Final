import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className="w-full dark-bg rounded-xl overflow-hidden">
    <thead>
      <tr className="purple-accent-bg soft-white-text">
        <th className="p-2">Nombre</th>
        <th className="p-2">Precio</th>
        <th className="p-2">Stock</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p._id} className="hover-bg-opacity-50 transition-all">
          <td className="p-2 soft-white-text">{p.nombre || 'N/A'}</td>
          <td className="p-2 soft-white-text">{p.precio || 0}</td>
          <td className="p-2 soft-white-text">{p.stock || 0}</td>
          <td className="p-2">
            <button onClick={() => onEdit(p._id)} className="purple-accent-bg soft-white-text p-1 rounded-xl hover-opacity-80 transition-all">Editar</button>
            <button onClick={() => onDelete(p._id)} className="purple-accent-bg soft-white-text p-1 rounded-xl hover-opacity-80 transition-all ml-2">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;