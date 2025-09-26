import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className="w-full bg-dark-bg rounded-xl overflow-hidden">
    <thead>
      <tr className="bg-purple-accent text-soft-white">
        <th className="p-2">Nombre</th>
        <th className="p-2">Precio</th>
        <th className="p-2">Stock</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p._id} className="hover:bg-opacity-50 transition-all duration-300">
          <td className="p-2 text-soft-white">{p.nombre || 'N/A'}</td> {/* Agrega text-soft-white y default N/A si undefined */}
          <td className="p-2 text-soft-white">{p.precio || 0}</td>
          <td className="p-2 text-soft-white">{p.stock || 0}</td>
          <td className="p-2">
            <button onClick={() => onEdit(p._id)} className="bg-purple-accent text-soft-white p-1 rounded-xl hover:bg-opacity-80 transition-all duration-300">Editar</button>
            <button onClick={() => onDelete(p._id)} className="bg-purple-accent text-soft-white p-1 rounded-xl hover:bg-opacity-80 transition-all duration-300 ml-2">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;